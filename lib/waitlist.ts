import { supabase } from "@/lib/supabase";
import { isValidEmail } from "@/lib/waitlist-celebration";

export type WaitlistSubmitResult =
  | { success: true; message: string }
  | { success: false; message: string };

const WAITLIST_TABLE = "waitlist";
const WAITLIST_EMAIL_COLUMN = "email";

function logWaitlistConfig() {
  console.log("[waitlist] Env check:", {
    hasUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "(undefined)",
    hasKey: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    keyLength: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length ?? 0,
    table: WAITLIST_TABLE,
    column: WAITLIST_EMAIL_COLUMN,
  });
}

function logSupabaseError(context: string, error: unknown) {
  if (error && typeof error === "object") {
    const supabaseError = error as {
      message?: string;
      code?: string;
      details?: string;
      hint?: string;
    };

    console.error(`[waitlist] ${context}:`, {
      message: supabaseError.message,
      code: supabaseError.code,
      details: supabaseError.details,
      hint: supabaseError.hint,
      full: error,
    });
    return;
  }

  console.error(`[waitlist] ${context}:`, error);
}

export async function submitToWaitlist(
  email: string,
): Promise<WaitlistSubmitResult> {
  const trimmed = email.trim();

  if (!trimmed || !isValidEmail(trimmed)) {
    return { success: false, message: "Please enter a valid email address." };
  }

  logWaitlistConfig();

  try {
    const { error } = await supabase
      .from(WAITLIST_TABLE)
      .insert({ [WAITLIST_EMAIL_COLUMN]: trimmed });

    if (!error) {
      return { success: true, message: "You're on the list" };
    }

    logSupabaseError("Supabase insert failed", error);

    if (error.code === "23505") {
      return { success: true, message: "You're already on the list" };
    }

    return { success: false, message: "Something went wrong, try again." };
  } catch (error) {
    logSupabaseError("Unexpected error during insert", error);
    return { success: false, message: "Something went wrong, try again." };
  }
}
