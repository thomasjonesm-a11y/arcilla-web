import { supabase } from "@/lib/supabase";
import { isValidEmail } from "@/lib/waitlist-celebration";

export type WaitlistSubmitResult =
  | { success: true; message: string }
  | { success: false; message: string };

export async function submitToWaitlist(
  email: string,
): Promise<WaitlistSubmitResult> {
  const trimmed = email.trim();

  if (!trimmed || !isValidEmail(trimmed)) {
    return { success: false, message: "Please enter a valid email address." };
  }

  const { error } = await supabase.from("waitlist").insert({ email: trimmed });

  if (!error) {
    return { success: true, message: "You're on the list" };
  }

  if (error.code === "23505") {
    return { success: true, message: "You're already on the list" };
  }

  return { success: false, message: "Something went wrong, try again." };
}
