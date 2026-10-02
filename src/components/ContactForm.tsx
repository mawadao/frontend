"use client";

import { useState, type FormEvent } from "react";
import { Field } from "./Field";
import { site } from "@/lib/site";

const topics = ["Join as a contributor", "Propose a project", "Partner or donate", "Something else"];

/** No backend yet: submitting opens the visitor's mail app with the message prefilled. */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = `[${data.get("topic")}] from ${data.get("name")}`;
    const body = `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-2">
      <Field label="Your name" name="name" autoComplete="name" required />
      <Field label="Email" name="email" type="email" autoComplete="email" required />
      <label className="relative sm:col-span-2">
        <span className="sr-only">Topic</span>
        <select
          name="topic"
          defaultValue={topics[0]}
          className="h-14 w-full appearance-none rounded-xl border border-line bg-field px-4 text-[17px] outline-none focus:border-cta focus:ring-4 focus:ring-cta/20"
        >
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-fg-2" aria-hidden="true">
          ⌄
        </span>
      </label>
      <label className="sm:col-span-2">
        <span className="sr-only">Message</span>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="Tell us what you'd like to build, learn or support."
          className="w-full resize-none rounded-xl border border-line bg-field px-4 py-3.5 text-[17px] outline-none placeholder:text-fg-2 focus:border-cta focus:ring-4 focus:ring-cta/20"
        />
      </label>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          className="rounded-full bg-cta px-6 py-3 text-[17px] font-medium text-white transition-colors hover:bg-cta-hover"
        >
          Send message
        </button>
        <p className="text-[14px] text-fg-2" aria-live="polite">
          {sent ? "Your mail app should open with the message ready to send." : <>Or write to <a className="text-link hover:underline" href={`mailto:${site.email}`}>{site.email}</a></>}
        </p>
      </div>
    </form>
  );
}
