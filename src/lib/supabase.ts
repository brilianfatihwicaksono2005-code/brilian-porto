import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

function readEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\/+$/, "");
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  return { url, anonKey };
}

/**
 * Lazily create a singleton Supabase client.
 *
 * Lazy init keeps the module import side-effect free, so the build does not
 * fail when the environment variables are absent (e.g. during CI prerender).
 */
export function getSupabase(): SupabaseClient {
  if (client) return client;

  const { url, anonKey } = readEnv();

  if (!url || !anonKey) {
    throw new Error(
      "Missing Supabase environment variables: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (restart `next dev` after editing .env.local).",
    );
  }

  if (!/^https?:\/\//.test(url)) {
    throw new Error(
      `NEXT_PUBLIC_SUPABASE_URL looks invalid: "${url}". It must be the project API URL, e.g. https://<project-ref>.supabase.co`,
    );
  }

  client = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return client;
}

/** Hostname only — safe to log, useful for diagnosing "fetch failed". */
export function getSupabaseHost(): string {
  const { url } = readEnv();
  if (!url) return "(missing)";
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
}
