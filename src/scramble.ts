// Text scramble + rotating phrases — ported/extended from the old global scrambler.js.
// Uses textContent (no innerHTML), per-element rAF handles and teardown.

interface QueueItem {
  from: string;
  to: string;
  start: number;
  end: number;
  char: string;
}

const rafHandles = new WeakMap<HTMLElement, number>();
const timers = new WeakMap<HTMLElement, number>();
const animating = new WeakSet<HTMLElement>();
const tracked = new Set<HTMLElement>();

const DEFAULT_CHARS = '!<>-_/[]{}—=+*^?#________';
const ROTATE_DELAY = 3200;

function randomChar(chars: string): string {
  return chars[Math.floor(Math.random() * chars.length)] ?? '';
}

function scrambleTo(el: HTMLElement, target: string, onDone?: () => void): void {
  const chars = el.dataset.scrambleChars || DEFAULT_CHARS;
  const from = el.textContent ?? '';
  const length = Math.max(from.length, target.length);

  const previous = rafHandles.get(el);
  if (previous) cancelAnimationFrame(previous);

  const queue: QueueItem[] = [];
  for (let i = 0; i < length; i++) {
    const start = Math.floor(Math.random() * 30);
    queue.push({
      from: from[i] ?? '',
      to: target[i] ?? '',
      start,
      end: start + Math.floor(Math.random() * 30) + 10,
      char: '',
    });
  }

  let frame = 0;
  animating.add(el);
  el.classList.add('is-scrambling');

  const tick = () => {
    let output = '';
    let complete = 0;

    for (const item of queue) {
      if (frame >= item.end) {
        complete++;
        output += item.to;
      } else if (frame >= item.start) {
        if (!item.char || Math.random() < 0.28) item.char = randomChar(chars);
        output += item.char;
      } else {
        output += item.from;
      }
    }

    el.textContent = output;

    if (complete === queue.length) {
      el.classList.remove('is-scrambling');
      rafHandles.delete(el);
      animating.delete(el);
      onDone?.();
    } else {
      frame++;
      rafHandles.set(el, requestAnimationFrame(tick));
    }
  };

  rafHandles.set(el, requestAnimationFrame(tick));
}

function readPhrases(el: HTMLElement): string[] {
  const raw = el.dataset.scramblePhrases;
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === 'string' && item.length > 0);
  } catch {
    return [];
  }
}

function scheduleNext(el: HTMLElement, phrases: string[]): void {
  const timer = window.setTimeout(() => {
    // Don't rotate in a hidden tab — pick it up when the page is visible again.
    if (document.visibilityState === 'hidden') {
      scheduleNext(el, phrases);
      return;
    }
    advance(el, phrases);
  }, ROTATE_DELAY);
  timers.set(el, timer);
}

function advance(el: HTMLElement, phrases: string[]): void {
  if (animating.has(el)) {
    scheduleNext(el, phrases);
    return;
  }

  const current = el.dataset.scrambleText ?? phrases[0] ?? '';
  const index = Math.max(0, phrases.indexOf(current));
  const next = phrases[(index + 1) % phrases.length] ?? current;
  el.dataset.scrambleText = next;
  scrambleTo(el, next, () => scheduleNext(el, phrases));
}

function stopTimers(): void {
  tracked.forEach((el) => {
    const timer = timers.get(el);
    if (timer) window.clearTimeout(timer);
    const handle = rafHandles.get(el);
    if (handle) cancelAnimationFrame(handle);
  });
}

function initScramble(): void {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const elements = document.querySelectorAll<HTMLElement>('[data-scramble]');

  elements.forEach((el, index) => {
    tracked.add(el);
    const phrases = readPhrases(el);
    const initial = phrases[0] ?? (el.textContent ?? '').trim();
    el.dataset.scrambleText = initial;
    el.textContent = initial;

    if (reducedMotion) return;

    if (phrases.length > 1) {
      window.setTimeout(() => scheduleNext(el, phrases), 900 + index * 200);
    } else {
      window.setTimeout(() => scrambleTo(el, initial), 250 + index * 180);
    }

    el.addEventListener('mouseover', () => {
      const timer = timers.get(el);
      if (timer) window.clearTimeout(timer);

      if (phrases.length > 1) {
        advance(el, phrases);
      } else {
        scrambleTo(el, el.dataset.scrambleText ?? initial);
      }
    });
  });

  window.addEventListener('pagehide', stopTimers, { once: true });
}

initScramble();
