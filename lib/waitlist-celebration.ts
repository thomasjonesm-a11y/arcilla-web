import confetti from "canvas-confetti";

export const WAITLIST_CONFETTI_COLORS = [
  "#665BF4",
  "#E5484D",
  "#30A46C",
  "#F5D90A",
] as const;

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function fireWaitlistConfetti(originElement: HTMLElement) {
  const rect = originElement.getBoundingClientRect();
  const x = (rect.left + rect.width / 2) / window.innerWidth;
  const y = (rect.top + rect.height / 2) / window.innerHeight;

  confetti({
    particleCount: 40,
    spread: 48,
    startVelocity: 22,
    decay: 0.92,
    gravity: 1.1,
    ticks: 90,
    origin: { x, y },
    colors: [...WAITLIST_CONFETTI_COLORS],
    disableForReducedMotion: true,
    scalar: 0.65,
  });
}
