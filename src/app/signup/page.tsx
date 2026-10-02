import type { Metadata } from "next";
import { AuthForm } from "@/components/AuthForm";

export const metadata: Metadata = { title: "Join" };

export default function SignupPage() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-bg-alt px-4 pt-24 pb-16">
      <AuthForm mode="signup" />
    </main>
  );
}
