"use client";

import Image from "next/image";
import { useState } from "react";
import {
  HeroIllustration,
  SkillsDiagram,
  ChallengeIllustration,
  ProgressIllustration,
  EarnArtIllustration,
  RealTeachingIllustration,
} from "@/components/illustrations";

const CARD_STROKE = "#3a3a3a";
const CARD_FILL = "#0c0912";

function EarlyAccessIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M4 13L13 4M13 4H6.5M13 4V10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShapeProductIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M9 2.5L14.5 5.75V11.25L9 14.5L3.5 11.25V5.75L9 2.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function BuildRealIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M9 2V16M2 9H16M4.05 4.05L13.95 13.95M13.95 4.05L4.05 13.95"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FeatureCard({
  glowRgb,
  illustration,
  title,
  body,
}: {
  glowRgb: string;
  illustration: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <article
      className="feature-card group flex h-full min-h-[640px] flex-col overflow-hidden rounded-3xl border border-surface-border bg-background"
      style={{ "--glow-rgb": glowRgb } as React.CSSProperties}
    >
      <div className="flex min-h-0 flex-1 items-center justify-center px-10 pb-4 pt-10">
        <div className="feature-card-illo flex w-full items-center justify-center">
          {illustration}
        </div>
      </div>
      <div className="shrink-0 bg-gradient-to-b from-transparent via-[rgba(255,255,255,0.015)] to-[rgba(255,255,255,0.04)] p-10">
        <h3 className="heading-3 text-left text-foreground">{title}</h3>
        <p className="body-lg mt-4 text-left text-foreground-muted">{body}</p>
      </div>
    </article>
  );
}

function MiniCard({
  glowRgb,
  icon,
  title,
  body,
}: {
  glowRgb: string;
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <article
      className="mini-card rounded-2xl border border-transparent bg-[rgba(255,255,255,0.03)] p-8"
      style={{ "--glow-rgb": glowRgb } as React.CSSProperties}
    >
      <div className="flex items-center gap-4">
        <div className="mini-card-icon flex size-10 shrink-0 items-center justify-center rounded-[10px] border border-surface-border bg-[rgba(255,255,255,0.04)] text-foreground">
          {icon}
        </div>
        <h3 className="heading-4 text-foreground">{title}</h3>
      </div>
      <p className="body-lg mt-6 text-foreground-muted">{body}</p>
    </article>
  );
}

const BUILT_DIFFERENTLY_TAGS = [
  "Structured",
  "Adaptive",
  "Accessible",
  "Outcome-oriented",
];

const TECHNOLOGY_MINI_CARDS = [
  {
    title: "Get early access",
    body: "Join the waitlist and be among the first in. Free during early access, no strings.",
    icon: <EarlyAccessIcon />,
    glowRgb: "158 181 255",
  },
  {
    title: "Shape the product",
    body: "Early users decide what we build next. Your first conversations become everyone's better challenges.",
    icon: <ShapeProductIcon />,
    glowRgb: "236 231 223",
  },
  {
    title: "Build something real",
    body: "Every challenge is a rehearsal for the world outside the app. Practice it here. Then go do it for real.",
    icon: <BuildRealIcon />,
    glowRgb: "102 91 244",
  },
];

const FAQ_ITEMS = [
  {
    question: "What is Arcilla?",
    answer:
      "An AI-powered Spanish learning app built around real conversations, not streaks. You practice a real situation, ordering at a taqueria, talking to a landlord, with an AI that responds at human speed. Then you go do it for real.",
  },
  {
    question: "Who is it for?",
    answer:
      "Heritage speakers who understand Spanish but freeze when they speak it. Professionals who need Spanish for work. Anyone who has tried every other app and still can't hold a conversation.",
  },
  {
    question: "How is it different from Duolingo?",
    answer:
      "Duolingo measures streaks. Arcilla measures one thing: did you have a real conversation today? Every lesson builds toward a real conversation, not a longer streak.",
  },
  {
    question: "What is a challenge?",
    answer:
      "The core of Arcilla. The AI plays a real person, a cashier, a patient, a landlord, and you have a real conversation in Spanish. No hints, no multiple choice, no switching to English.",
  },
  {
    question: "Do I need to keep the app open during meetings?",
    answer:
      "No. Once connected, it joins automatically and handles everything in the background.",
  },
  {
    question: "Do I have to speak out loud?",
    answer:
      "Yes, eventually, that's the point. You build up through lessons first, then the challenge puts you in a real conversation. The app prepares you so that by the time you speak, you're ready.",
  },
  {
    question: "What are the ceramic objects?",
    answer:
      "Every challenge you complete unlocks a real ceramic piece from the Spanish-speaking world, a Talavera bowl from Puebla, a barro negro mug from Oaxaca. Your collection grows as the language opens the world. Art, earned. Not points.",
  },
  {
    question: "Does Arcilla store my voice?",
    answer:
      "Your voice is processed in real time to power the conversation. It isn't stored after the session ends. More detail lives in our privacy policy.",
  },
  {
    question: "Is it free?",
    answer:
      "Free during early access. Join the waitlist and you'll be among the first in.",
  },
  {
    question: "What language does it teach?",
    answer:
      "Spanish first. More languages will follow once the experience is right.",
  },
  {
    question: "When does it launch?",
    answer:
      "Soon. Join the waitlist and you'll be the first to know, and the first in.",
  },
];

const FEATURE_CARDS = [
  {
    glowRgb: "102 91 244",
    title: "The challenge",
    body: "The AI plays the cashier. You play yourself. A counter. An order to place. Only Spanish. The AI answers in 320 milliseconds, the same pause a real person takes. No hints. No multiple choice. No way out but through.",
    illustration: (
      <ChallengeIllustration
        stroke={CARD_STROKE}
        fill={CARD_FILL}
        className="h-auto w-full max-w-[300px]"
      />
    ),
  },
  {
    glowRgb: "14 187 110",
    title: "Progress",
    body: "No streaks. No lives. No 11pm panic to protect a number. Leave for two weeks and everything is exactly where you left it. Arcilla never takes anything away. The only thing that changes is what you add.",
    illustration: (
      <ProgressIllustration
        stroke={CARD_STROKE}
        className="h-auto w-full max-w-[300px]"
      />
    ),
  },
  {
    glowRgb: "196 132 84",
    title: "Earn art. Not points.",
    body: "Every challenge unlocks a ceramic piece from a real place. A Talavera bowl from Puebla. A barro negro mug from Oaxaca. Objects with four hundred years of hands behind them. The collection grows as the language opens the world.",
    illustration: (
      <EarnArtIllustration
        stroke={CARD_STROKE}
        className="h-auto w-full max-w-[300px]"
      />
    ),
  },
  {
    glowRgb: "139 157 255",
    title: "Real teaching, encoded.",
    body: "Every AI character is shaped by a working language educator. How fast Carlos speaks. When he prompts you. How he handles your silence. Twenty years of classroom instinct, available at midnight.",
    illustration: (
      <RealTeachingIllustration
        stroke={CARD_STROKE}
        className="h-auto w-full max-w-[300px]"
      />
    ),
  },
];

export default function Home() {
  const [email, setEmail] = useState("");

  function handleSubmit() {
    console.log(email);
  }

  return (
    <div className="bg-background">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8 lg:px-10">
        <Image
          src="/brand/logo.png"
          alt="Arcilla"
          width={140}
          height={32}
          className="h-8 w-auto"
          priority
        />
        <button
          type="button"
          className="rounded-full border border-pill-border px-4 py-1.5 text-sm text-foreground"
        >
          Join the waitlist
        </button>
      </header>

      {/* Hero */}
      <section className="mx-auto flex max-w-7xl flex-col items-center px-6 pb-24 lg:px-10">
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

      {/* Four skills */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <h2 className="heading-2 mx-auto max-w-[700px] text-center text-foreground">
          Not a game. Not passive practice.
        </h2>
        <p className="body-lg mx-auto mt-8 max-w-[550px] text-center text-foreground-muted">
          Every app rewards you for showing up. Arcilla prepares you for the
          moment you&apos;ve been avoiding: the real conversation. Listening,
          reading, writing, speaking, all four, all pointed at the same door.
        </p>
        <SkillsDiagram className="mx-auto mt-20 w-full max-w-4xl" />
      </section>

      {/* Personalized path — 2×2 feature cards */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <h2 className="heading-2 mx-auto max-w-[700px] text-center text-foreground">
          A personalized path to fluency.
        </h2>
        <p className="body-lg mx-auto mt-8 max-w-[550px] text-center text-foreground-muted">
          Every session moves you closer to a real conversation.
        </p>

        <div className="mt-20 grid items-stretch gap-5 md:grid-cols-2">
          {FEATURE_CARDS.map((card) => (
            <FeatureCard
              key={card.title}
              glowRgb={card.glowRgb}
              illustration={card.illustration}
              title={card.title}
              body={card.body}
            />
          ))}
        </div>
      </section>

      {/* Technology band + mini-cards */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-10 md:grid-cols-3 md:items-start md:gap-8 lg:gap-12">
          <h2 className="heading-2 text-foreground">
            Technology guided by education.
          </h2>
          <p className="body-lg text-foreground-muted">
            Arcilla uses AI to shape every session around you: your pace, your
            gaps, your reasons for learning. The curriculum underneath it comes
            from educators who have spent years in real classrooms watching real
            students find their voice.
          </p>
          <p className="body-lg text-foreground-muted">
            We&apos;re not replacing teachers. We&apos;re building what they
            would build if they had unlimited time with every student. Arcilla is
            for people who want structured progress instead of random vocabulary,
            who learn at their own pace, and who are done collecting points and
            ready to actually speak.
          </p>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3 md:gap-5">
          {TECHNOLOGY_MINI_CARDS.map((card) => (
            <MiniCard
              key={card.title}
              glowRgb={card.glowRgb}
              icon={card.icon}
              title={card.title}
              body={card.body}
            />
          ))}
        </div>
      </section>

      {/* Built differently + FAQ */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-16">
          <div className="md:max-w-xl">
            <h2 className="heading-2 text-foreground">
              Built differently, on purpose.
            </h2>
            <p className="body-lg mt-8 text-foreground-muted">
              Arcilla is designed for one outcome: you leave every session closer to
              a real conversation than when you started. We don&apos;t measure streaks.
              We measure moments.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:max-w-md">
            {BUILT_DIFFERENTLY_TAGS.map((tag) => (
              <span
                key={tag}
                className="label-mono rounded-full border border-surface-border px-4 py-1.5 text-center uppercase text-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-24 max-w-4xl rounded-3xl border border-surface-border px-6 py-10 md:px-12 md:py-14">
          <h2 className="heading-2 text-center text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="body-lg mx-auto mt-8 max-w-[550px] text-center text-foreground-muted">
            Straight answers on how Arcilla works, what happens to your voice, and
            what makes this different.
          </p>

          <div className="mt-12 divide-y divide-dashed divide-surface-border border-y border-dashed border-surface-border">
            {FAQ_ITEMS.map((item) => (
              <details key={item.question} className="group py-8 md:py-10">
                <summary className="heading-4 flex cursor-pointer list-none items-center justify-between gap-6 text-foreground [&::-webkit-details-marker]:hidden">
                  <span>{item.question}</span>
                  <span
                    className="shrink-0 text-xl leading-none text-foreground-muted transition-transform duration-200 group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="body-lg mt-6 text-foreground-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Image
            src="/brand/footer-wordmark.png"
            alt="Arcilla"
            width={2400}
            height={400}
            className="h-auto w-full"
          />
        </div>
        <p className="body-sm absolute right-6 bottom-6 text-foreground-subtle lg:right-10 lg:bottom-8">
          &copy; All rights reserved.
        </p>
      </footer>
    </div>
  );
}
