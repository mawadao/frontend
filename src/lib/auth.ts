/**
 * Auth client. No provider is connected yet, so the login and signup UI is
 * real but every call resolves to `{ ok: false }` with a friendly notice.
 * To go live, replace these bodies with a provider (Supabase, Auth.js, a
 * wallet-based sign-in, …). The pages only depend on this module's contract.
 */
export type AuthResult = { ok: true } | { ok: false; message: string };

export type Provider = "github" | "wallet";

const notConnected: AuthResult = {
  ok: false,
  message: "Accounts open soon. Nothing was submitted. In the meantime, join us on GitHub at github.com/mawadao.",
};

const pause = () => new Promise((r) => setTimeout(r, 700));

export async function signIn(_input: { email: string; password: string }): Promise<AuthResult> {
  await pause();
  return notConnected;
}

export async function signUp(_input: { name: string; email: string; password: string }): Promise<AuthResult> {
  await pause();
  return notConnected;
}

export async function signInWith(_provider: Provider): Promise<AuthResult> {
  await pause();
  return notConnected;
}
