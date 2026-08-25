"use client";

import Image from "next/image";
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  fireWaitlistConfetti,
  isValidEmail,
} from "@/lib/waitlist-celebration";
import {
  HeroIllustration,
  SkillsDiagram,
  ChallengeIllustration,
  ProgressIllustration,
  EarnArtIllustration,
  RealTeachingIllustration,
} from "@/components/illustrations";

const WAITLIST_COLLAPSE_MS = 350;

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
        d="M9 1.5L10.1 6.4L15 7.5L10.1 8.6L9 13.5L7.9 8.6L3 7.5L7.9 6.4L9 1.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return isMobile;
}

function NavWaitlistMobile({
  email,
  onEmailChange,
  onSubmit,
  onExpandedChange,
}: {
  email: string;
  onEmailChange: (value: string) => void;
  onSubmit: () => void;
  onExpandedChange: (expanded: boolean) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [collapsingToJoin, setCollapsingToJoin] = useState(false);
  const [joinCompactWidth, setJoinCompactWidth] = useState(200);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const collapseTimerRef = useRef<number | null>(null);

  function collapse() {
    if (collapseTimerRef.current) return;

    if (submitted && expanded) {
      setCollapsingToJoin(true);
      onExpandedChange(false);
      collapseTimerRef.current = window.setTimeout(() => {
        setExpanded(false);
        setSubmitted(false);
        setCollapsingToJoin(false);
        collapseTimerRef.current = null;
      }, WAITLIST_COLLAPSE_MS);
      return;
    }

    setExpanded(false);
    setSubmitted(false);
    onExpandedChange(false);
  }

  function expand() {
    setExpanded(true);
    setSubmitted(false);
    onExpandedChange(true);
  }

  function handleSubmitClick() {
    if (!isValidEmail(email)) return;

    if (buttonRef.current) {
      fireWaitlistConfetti(buttonRef.current);
    }

    onSubmit();
    setSubmitted(true);
  }

  useEffect(() => {
    return () => {
      onExpandedChange(false);
      if (collapseTimerRef.current) {
        window.clearTimeout(collapseTimerRef.current);
      }
    };
  }, [onExpandedChange]);

  useLayoutEffect(() => {
    if (!measureRef.current) return;

    measureRef.current.textContent = "Join the waitlist";
    setJoinCompactWidth(
      Math.ceil(measureRef.current.getBoundingClientRect().width + 60),
    );
  }, []);

  useEffect(() => {
    setSubmitted(false);
  }, [email]);

  useEffect(() => {
    if (expanded) {
      inputRef.current?.focus();
    }
  }, [expanded]);

  useEffect(() => {
    if (!expanded) return;

    function handlePointerDown(event: PointerEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        collapse();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        collapse();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [expanded]);

  if (!expanded && !collapsingToJoin) {
    return (
      <>
        <span
          ref={measureRef}
          className="pointer-events-none invisible absolute whitespace-pre text-sm"
          aria-hidden="true"
        />
        <button
          type="button"
          onClick={expand}
          className="cursor-pointer rounded-full border border-pill-border px-[30px] py-[13px] text-sm text-foreground"
        >
          Join the waitlist
        </button>
      </>
    );
  }

  return (
    <>
      <span
        ref={measureRef}
        className="pointer-events-none invisible absolute whitespace-pre text-sm"
        aria-hidden="true"
      />
      <div
        ref={containerRef}
        data-expanded={expanded}
        data-submitted={submitted}
        data-collapsing-to-join={collapsingToJoin}
        className="nav-waitlist-mobile absolute inset-y-0 left-0 right-0 z-20 flex items-center"
      >
        <div
          className={`nav-waitlist-mobile-pill ${collapsingToJoin ? "" : "w-full"} ${expanded && !collapsingToJoin ? "nav-waitlist-mobile-pill--entering" : ""}`}
          style={
            collapsingToJoin
              ? {
                  width: joinCompactWidth,
                  maxWidth: joinCompactWidth,
                  marginLeft: "auto",
                }
              : undefined
          }
        >
          <button
            type="button"
            onClick={expand}
            aria-hidden={expanded && !collapsingToJoin}
            tabIndex={expanded && !collapsingToJoin ? -1 : 0}
            className={`nav-waitlist-mobile-join px-[30px] py-[13px] text-sm text-foreground ${expanded && !collapsingToJoin ? "" : "cursor-pointer"}`}
          >
            Join the waitlist
          </button>
          <div className="nav-waitlist-mobile-field">
          <div
            className={`nav-waitlist-mobile-form ${submitted ? "is-hidden" : "is-visible"}`}
          >
            <input
              ref={inputRef}
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmitClick();
                }
              }}
              placeholder="Your email address"
              className="min-w-0 flex-1 bg-transparent px-3 py-1.5 text-sm text-foreground outline-none placeholder:text-foreground-subtle"
            />
            <button
              ref={buttonRef}
              type="button"
              onClick={handleSubmitClick}
              aria-label="Get notified"
              className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[rgba(255,255,255,0.35)] bg-transparent text-foreground transition-colors duration-200 ease-in-out hover:border-foreground/60 hover:bg-[rgba(255,255,255,0.08)]"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 8H13M13 8L9 4M13 8L9 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div
            className={`nav-waitlist-mobile-success text-sm text-foreground ${submitted ? "is-visible" : "is-hidden"}`}
            aria-live="polite"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3.5 8.25L6.5 11.25L12.5 4.75"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>You&apos;re on the list</span>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

function NavWaitlistDesktop({
  email,
  onEmailChange,
  onSubmit,
}: {
  email: string;
  onEmailChange: (value: string) => void;
  onSubmit: () => void;
}) {
  const MIN_EXPANDED_WIDTH = 396;
  const MAX_EXPANDED_WIDTH = 560;
  const COLLAPSED_PADDING = 12;

  const [expanded, setExpanded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [collapsingToJoin, setCollapsingToJoin] = useState(false);
  const [joinCompactWidth, setJoinCompactWidth] = useState(184);
  const [successCompactWidth, setSuccessCompactWidth] = useState(184);
  const [expandedWidth, setExpandedWidth] = useState(MIN_EXPANDED_WIDTH);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const joinRef = useRef<HTMLButtonElement>(null);
  const collapseTimerRef = useRef<number | null>(null);

  function collapse() {
    if (collapseTimerRef.current) return;

    if (submitted && expanded) {
      setCollapsingToJoin(true);
      collapseTimerRef.current = window.setTimeout(() => {
        setExpanded(false);
        setSubmitted(false);
        setCollapsingToJoin(false);
        collapseTimerRef.current = null;
      }, WAITLIST_COLLAPSE_MS);
      return;
    }

    setExpanded(false);
    setSubmitted(false);
  }

  function expand() {
    setExpanded(true);
    setSubmitted(false);
  }

  function handleSubmitClick() {
    if (!isValidEmail(email)) return;

    if (buttonRef.current) {
      fireWaitlistConfetti(buttonRef.current);
    }

    onSubmit();
    setSubmitted(true);
  }

  useLayoutEffect(() => {
    if (!measureRef.current) return;

    measureRef.current.textContent = "Join the waitlist";
    const joinTextWidth = measureRef.current.getBoundingClientRect().width;
    setJoinCompactWidth(Math.ceil(joinTextWidth + 24 + COLLAPSED_PADDING));

    measureRef.current.textContent = "You're on the list";
    const successTextWidth = measureRef.current.getBoundingClientRect().width;
    const successChrome = 16 + 8 + 24;

    setSuccessCompactWidth(
      Math.ceil(successTextWidth + successChrome + COLLAPSED_PADDING),
    );
  }, []);

  useLayoutEffect(() => {
    if (!expanded || submitted || !measureRef.current) return;

    const text = email || "Your email address";
    measureRef.current.textContent = text;
    const textWidth = measureRef.current.getBoundingClientRect().width;
    const buttonWidth = buttonRef.current?.offsetWidth ?? 36;
    const chrome = 36;

    setExpandedWidth(
      Math.min(
        MAX_EXPANDED_WIDTH,
        Math.max(MIN_EXPANDED_WIDTH, Math.ceil(textWidth + buttonWidth + chrome)),
      ),
    );
  }, [email, expanded, submitted]);

  const pillWidth = collapsingToJoin || !expanded
    ? joinCompactWidth
    : submitted
      ? successCompactWidth
      : expandedWidth;

  useEffect(() => {
    return () => {
      if (collapseTimerRef.current) {
        window.clearTimeout(collapseTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setSubmitted(false);
  }, [email]);

  useEffect(() => {
    if (expanded) {
      inputRef.current?.focus();
    }
  }, [expanded]);

  useEffect(() => {
    if (!expanded) return;

    function handlePointerDown(event: PointerEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        collapse();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        collapse();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [expanded]);

  const joinContentClass =
    expanded && !collapsingToJoin ? "" : "cursor-pointer";

  return (
    <div ref={containerRef} className="relative">
      <span
        ref={measureRef}
        className="pointer-events-none invisible absolute whitespace-pre text-sm"
        aria-hidden="true"
      />
      <div
        data-expanded={expanded}
        data-submitted={submitted}
        data-collapsing-to-join={collapsingToJoin}
        style={{
          width: pillWidth,
          maxWidth: pillWidth,
        }}
        className="nav-waitlist"
      >
        <button
          ref={joinRef}
          type="button"
          onClick={expand}
          aria-hidden={expanded && !collapsingToJoin}
          tabIndex={expanded && !collapsingToJoin ? -1 : 0}
          className={`nav-waitlist-join px-3 py-[13px] text-sm text-foreground ${joinContentClass}`}
        >
          Join the waitlist
        </button>
        <div className="nav-waitlist-field">
          <div
            className={`nav-waitlist-form ${submitted ? "is-hidden" : "is-visible"}`}
          >
            <input
              ref={inputRef}
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmitClick();
                }
              }}
              placeholder="Your email address"
              tabIndex={expanded && !submitted ? 0 : -1}
              className="min-w-0 flex-1 bg-transparent px-3 py-1.5 text-sm text-foreground outline-none placeholder:text-foreground-subtle"
            />
            <button
              ref={buttonRef}
              type="button"
              onClick={handleSubmitClick}
              aria-label="Get notified"
              tabIndex={expanded && !submitted ? 0 : -1}
              className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[rgba(255,255,255,0.3)] bg-transparent text-foreground transition-colors duration-200 ease-in-out hover:border-foreground/60 hover:bg-[rgba(255,255,255,0.08)]"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 8H13M13 8L9 4M13 8L9 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div
            className={`nav-waitlist-success text-sm text-foreground ${submitted ? "is-visible" : "is-hidden"}`}
            aria-live="polite"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3.5 8.25L6.5 11.25L12.5 4.75"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>You&apos;re on the list</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavWaitlist({
  email,
  onEmailChange,
  onSubmit,
  onMobileExpandedChange,
}: {
  email: string;
  onEmailChange: (value: string) => void;
  onSubmit: () => void;
  onMobileExpandedChange: (expanded: boolean) => void;
}) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <NavWaitlistMobile
        email={email}
        onEmailChange={onEmailChange}
        onSubmit={onSubmit}
        onExpandedChange={onMobileExpandedChange}
      />
    );
  }

  return (
    <NavWaitlistDesktop
      email={email}
      onEmailChange={onEmailChange}
      onSubmit={onSubmit}
    />
  );
}

function FeatureCard({
  hoverColor,
  illustration,
  title,
  body,
}: {
  hoverColor: string;
  illustration: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <article
      className="feature-card group flex h-full min-h-[640px] flex-col overflow-hidden rounded-3xl border border-surface-border bg-background hover:border-[var(--card-hover)]"
      style={{ "--card-hover": hoverColor } as React.CSSProperties}
    >
      <div className="flex min-h-0 flex-1 items-center justify-center px-10 pb-4 pt-10">
        <div className="feature-card-illo flex w-full items-center justify-center">
          {illustration}
        </div>
      </div>
      <div className="shrink-0 p-10">
        <h3 className="bd-xl-rg text-left text-foreground">{title}</h3>
        <p className="bd-sm-rg mt-[calc(1rem/3)] text-left text-foreground-muted">{body}</p>
      </div>
    </article>
  );
}

function MiniCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <article className="mini-card flex flex-col rounded-2xl bg-[#080808] p-6 md:p-8">
      <div className="flex items-stretch gap-2">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-[4px] bg-[rgba(255,255,255,0.04)] text-foreground">
          {icon}
        </div>
        <div className="flex min-h-10 flex-1 items-center rounded-[4px] bg-[rgba(255,255,255,0.04)] px-4">
          <h3 className="bd-lg-rg text-foreground">{title}</h3>
        </div>
      </div>
      <p className="bd-sm-rg mt-6 text-foreground-muted">{body}</p>
    </article>
  );
}

function FaqList({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  const [openQuestions, setOpenQuestions] = useState<Set<string>>(new Set());

  function toggleQuestion(question: string) {
    setOpenQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(question)) {
        next.delete(question);
      } else {
        next.add(question);
      }
      return next;
    });
  }

  return (
    <div className="mx-auto mt-[56px] max-w-[800px] divide-y divide-surface-border border-y border-surface-border">
      {items.map((item, index) => {
        const isOpen = openQuestions.has(item.question);
        const panelId = `faq-panel-${index}`;
        const triggerId = `faq-trigger-${index}`;

        return (
          <div key={item.question} className="py-4 md:py-5">
            <button
              type="button"
              id={triggerId}
              className="bd-lg-rg flex w-full cursor-pointer items-center justify-between gap-6 text-left text-foreground"
              onClick={() => toggleQuestion(item.question)}
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <span>{item.question}</span>
              <span
                className={`shrink-0 text-base leading-none text-foreground-muted transition-transform duration-300 ease-in-out ${isOpen ? "rotate-45" : ""}`}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="min-h-0 overflow-hidden">
                <p
                  className={`bd-sm-rg mt-3 text-foreground-muted transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-100" : "opacity-0"}`}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
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
  },
  {
    title: "Shape the product",
    body: "Early users decide what we build next. Your first conversations become everyone's better challenges.",
    icon: <ShapeProductIcon />,
  },
  {
    title: "Build something real",
    body: "Every challenge is a rehearsal for the world outside the app. Practice it here. Then go do it for real.",
    icon: <BuildRealIcon />,
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
    hoverColor: "var(--hover-purple)",
    title: "The challenge",
    body: "The AI plays the cashier. You play yourself. A counter. An order to place. Only Spanish. The AI answers in 320 milliseconds, the same pause a real person takes. No hints. No multiple choice. No way out but through.",
    illustration: (
      <ChallengeIllustration className="h-auto w-full max-w-[300px]" />
    ),
  },
  {
    hoverColor: "var(--hover-red)",
    title: "Progress",
    body: "No streaks. No lives. No 11pm panic to protect a number. Leave for two weeks and everything is exactly where you left it. Arcilla never takes anything away. The only thing that changes is what you add.",
    illustration: (
      <ProgressIllustration className="h-auto w-full max-w-[300px]" />
    ),
  },
  {
    hoverColor: "var(--hover-green)",
    title: "Earn art. Not points.",
    body: "Every challenge unlocks a ceramic piece from a real place. A Talavera bowl from Puebla. A barro negro mug from Oaxaca. Objects with four hundred years of hands behind them. The collection grows as the language opens the world.",
    illustration: (
      <EarnArtIllustration className="h-auto w-full max-w-[300px]" />
    ),
  },
  {
    hoverColor: "var(--hover-yellow)",
    title: "Real teaching, encoded.",
    body: "Every AI character is shaped by a working language educator. How fast Carlos speaks. When he prompts you. How he handles your silence. Twenty years of classroom instinct, available at midnight.",
    illustration: (
      <RealTeachingIllustration className="h-auto w-full max-w-[300px]" />
    ),
  },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [mobileNavExpanded, setMobileNavExpanded] = useState(false);

  function handleSubmit() {
    console.log(email);
  }

  return (
    <div className="bg-background">
      <header className="site-header sticky top-0 z-50">
        <div className="relative mx-auto w-full px-4 sm:px-6">
          <div className="relative mx-auto flex w-full max-w-[min(1296px,calc(100vw-48px))] items-center justify-between py-[15px]">
            <Image
              src="/brand/logo-mark.png"
              alt="Arcilla"
              width={48}
              height={48}
              className={`h-12 w-12 transition-opacity duration-300 ease-in-out sm:hidden ${mobileNavExpanded ? "pointer-events-none opacity-0" : "opacity-100"}`}
              priority
            />
            <Image
              src="/brand/logo.png"
              alt="Arcilla"
              width={140}
              height={32}
              className="hidden h-8 w-auto sm:block"
              priority
            />
            <NavWaitlist
              email={email}
              onEmailChange={setEmail}
              onSubmit={handleSubmit}
              onMobileExpandedChange={setMobileNavExpanded}
            />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto flex max-w-7xl flex-col items-center px-6 pb-24 lg:px-10">
        <p className="label-mono mt-[100px] rounded-full bg-[#121212] px-4 py-1.5 text-foreground">
          Be part of the first release
        </p>

        <h1 className="heading-1 mx-auto mt-5 max-w-[567px] text-center text-foreground">
          Years of streaks and still can&apos;t hold a conversation.
        </h1>

        <p className="body-lg mx-auto mb-[100px] mt-4 max-w-[550px] text-center text-foreground-muted">
          Arcilla teaches Spanish the way you&apos;ll actually use it: out loud,
          under pressure, with someone talking back. Join the waitlist. One email
          when it&apos;s ready.
        </p>

        <div className="w-full max-w-[1000px]">
          <HeroIllustration className="h-auto w-full" />
        </div>
      </section>

      {/* Four skills */}
      <section className="mx-auto max-w-7xl px-6 pt-24 pb-12 lg:px-10 lg:pt-32 lg:pb-16">
        <h2 className="heading-2 mx-auto max-w-[700px] text-center text-foreground">
          Not a game. Not passive practice.
        </h2>
        <p className="body-lg mx-auto mt-4 max-w-[550px] text-center text-foreground-muted">
          Every app rewards you for showing up. Arcilla prepares you for the
          moment you&apos;ve been avoiding: the real conversation. Listening,
          reading, writing, speaking, all four, all pointed at the same door.
        </p>
        <SkillsDiagram className="mx-auto mt-10 w-full max-w-4xl" />
      </section>

      {/* Personalized path — 2×2 feature cards */}
      <section className="mx-auto max-w-7xl px-6 pt-12 pb-24 lg:px-10 lg:pt-16 lg:pb-32">
        <h2 className="heading-2 mx-auto max-w-[700px] text-center text-foreground">
          A personalized path to fluency.
        </h2>
        <p className="body-lg mx-auto mt-2 max-w-[550px] text-center text-foreground-muted">
          Every session moves you closer to a real conversation.
        </p>

        <div className="mt-[100px] grid items-stretch gap-5 md:grid-cols-2">
          {FEATURE_CARDS.map((card) => (
            <FeatureCard
              key={card.title}
              hoverColor={card.hoverColor}
              illustration={card.illustration}
              title={card.title}
              body={card.body}
            />
          ))}
        </div>
      </section>

      {/* Technology band + mini-cards */}
      <section className="mx-auto max-w-7xl px-6 pt-24 pb-12 lg:px-10 lg:pt-32 lg:pb-16">
        <div className="grid gap-5 md:grid-cols-3 md:items-start md:gap-4 lg:gap-6">
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

        <div className="mt-8 grid gap-4 md:grid-cols-3 md:gap-5">
          {TECHNOLOGY_MINI_CARDS.map((card) => (
            <MiniCard
              key={card.title}
              icon={card.icon}
              title={card.title}
              body={card.body}
            />
          ))}
        </div>
      </section>

      {/* Built differently */}
      <section className="mx-auto max-w-7xl px-6 py-[108px] lg:px-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between md:gap-8">
          <div className="md:max-w-xl">
            <h2 className="heading-2 text-foreground">
              Built differently, on purpose.
            </h2>
            <p className="body-lg mt-2 text-foreground-muted">
              Arcilla is designed for one outcome: you leave every session closer to
              a real conversation than when you started. We don&apos;t measure streaks.
              We measure moments.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:flex-nowrap md:items-center md:gap-0">
            {BUILT_DIFFERENTLY_TAGS.map((tag, index) => (
              <Fragment key={tag}>
                {index > 0 && (
                  <span
                    className="built-differently-connector hidden h-px w-8 shrink-0 bg-surface-border md:block"
                    aria-hidden="true"
                  />
                )}
                <span className="built-differently-tag label-mono shrink-0 rounded-[4px] border border-white px-4 py-1.5 text-foreground">
                  {tag}
                </span>
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full px-6 pb-24 lg:pb-32">
        <div className="mx-auto w-full max-w-[min(1296px,calc(100vw-48px))] rounded-3xl border border-surface-border px-6 pt-[174px] pb-[174px] md:px-12">
          <h2 className="heading-2 text-center text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="body-lg mx-auto mt-2 max-w-[550px] text-center text-foreground-muted">
            Straight answers on how Arcilla works, what happens to your voice, and
            what makes this different.
          </p>

          <FaqList items={FAQ_ITEMS} />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 md:py-24">
        <div className="mx-auto w-full px-6">
          <div className="mx-auto w-full max-w-[min(1296px,calc(100vw-48px))]">
            <Image
              src="/brand/footer-wordmark.png"
              alt="Arcilla"
              width={1024}
              height={219}
              className="h-auto w-full"
            />
            <p className="body-sm mt-6 text-right text-foreground-subtle md:mt-8">
              &copy; All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
