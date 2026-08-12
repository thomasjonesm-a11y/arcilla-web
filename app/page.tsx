"use client";

import { useState } from "react";
import { HeroIllustration } from "@/components/illustrations";

export default function Home() {
  const [email, setEmail] = useState("");

  function handleSubmit() {
    console.log(email);
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8">
        <span className="font-serif text-xl text-foreground">Arcilla</span>
        <button
          type="button"
          className="rounded-full border border-pill-border px-4 py-1.5 text-sm text-foreground"
        >
          Join the waitlist
        </button>
      </header>

      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 pb-24">
        <div className="label-mono mt-12 inline-flex items-center gap-2 rounded-full border border-pill-border px-4 py-1.5 uppercase text-foreground">
          <span>Be part of the first release</span>
          <span aria-hidden="true">↗</span>
        </div>

        <h1 className="heading-1 mx-auto mt-10 max-w-[700px] text-center text-foreground">
          Years of streaks and still can&apos;t hold a conversation.
        </h1>

        <p className="body-lg mx-auto mt-8 max-w-[550px] text-center text-foreground-muted">
          Arcilla teaches Spanish the way you&apos;ll actually use it: out loud,
          under pressure, with someone talking back. Join the waitlist. One email
          when it&apos;s ready.
        </p>

        <div className="mt-12 flex w-full max-w-md items-center rounded-full border border-pill-border p-1.5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email Address"
            className="min-w-0 flex-1 bg-transparent px-4 py-2 text-foreground outline-none placeholder:text-foreground-subtle"
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="shrink-0 rounded-full bg-foreground px-5 py-2 text-sm text-background"
          >
            Get Notified
          </button>
        </div>

        <p className="body-sm mt-4 text-center text-foreground-subtle">
          No credit card. No commitment. Just early access.
        </p>

        <div className="mt-20 w-full max-w-[1000px]">
          <HeroIllustration className="h-auto w-full" />
        </div>
      </section>
    </div>
  );
}
