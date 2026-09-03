import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function logSupabaseConfigIssues() {
  if (!supabaseUrl || !supabaseUrl.startsWith("http")) {
    console.error(
      "[supabase] NEXT_PUBLIC_SUPABASE_URL is missing or invalid:",
      supabaseUrl ?? "(undefined)",
    );
  }

  if (!supabaseAnonKey || supabaseAnonKey.includes("YOUR_")) {
    console.error(
      "[supabase] NEXT_PUBLIC_SUPABASE_ANON_KEY is missing or still a placeholder:",
      supabaseAnonKey ? "(placeholder value)" : "(undefined)",
    );
  }
}

if (typeof window !== "undefined") {
  logSupabaseConfigIssues();
}

export const supabase = createClient(
  supabaseUrl?.startsWith("http") ? supabaseUrl : "https://placeholder.supabase.co",
  supabaseAnonKey && !supabaseAnonKey.includes("YOUR_")
    ? supabaseAnonKey
    : "placeholder-key",
);
