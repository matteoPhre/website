// Text scramble + rotating phrase slots — extended from the old global scrambler.js.
// Phrases may contain [[option|option|option]] slots; one option is shown at a time,
// highlighted via .scramble__word, and the slot scrambles when the phrase rotates.

interface QueueItem {
  from: string;
  to: string;
  start: number;
  end: number;
  char: string;
}

const rafHandles = new WeakMap<HTMLElement, number>();
const timers = new WeakMap<HTMLElement, number>();
const phrasesByEl = new WeakMap<HTMLElement, string[]>();
const indexByEl = new WeakMap<HTMLElement, number>();
const tracked = new Set<HTMLElement>();

const DEFAULT_CHARS = '!<>-_/[]{}—=+*^?#________';
const ROTATE_DELAY = 3200;
const MARKER_GLOBAL = /\[\[([^\]]+)\]\]/g;
const MARKER_EXACT = /^\[\[([^\]]+)\]\]$/;

function randomChar(chars: string): string {
  return chars[Math.floor(Math.random() * chars.length)] ?? '';
}

function buildQueue(from: string, to: string): QueueItem[] {
  const length = Math.max(from.length, to.length);
  const queue: QueueItem[] = [];
  for (let i = 0; i < length; i++) {
    const start = Math.floor(Math.random() * 30);
    queue.push({
      from: from[i] ?? '',
      to: to[i] ?? '',
      start,
      end: start + Math.floor(Math.random() * 30) + 10,
      char: '',
    });
  }
  return queue;
}

function cartesian(options: string[][]): string[][] {
  return options.reduce<string[][]>(
    (combos, group) => combos.flatMap((combo) => group.map((option) => [...combo, option])),
    [[]],
  );
}

/** Expand templates into one phrase per combination of slot options.
 *  The [[...]] markers are kept around the chosen word so it can be rendered as a span. */
function expandTemplates(templates: string[]): string[] {
  const result: string[] = [];

  for (const template of templates) {
    const groups = [...template.matchAll(MARKER_GLOBAL)].map((match) =>
      (match[1] ?? '').split('|').map((option) => option.trim()),
    );

    if (groups.length === 0) {
      result.push(template);
      continue;
    }

    for (const combo of cartesian(groups)) {
      let i = 0;
      result.push(template.replace(MARKER_GLOBAL, () => `[[${combo[i++] ?? ''}]]`));
    }
  }

  return result;
}

function render(el: HTMLElement, phrase: string): void {
  el.replaceChildren();
  const chunks = phrase.split(/(\[\[[^\]]+\]\])/).filter((chunk) => chunk.length > 0);

  for (const chunk of chunks) {
    const match = MARKER_EXACT.exec(chunk);
    if (match) {
      const word = document.createElement('span');
      word.className = 'scramble__word';
      word.textContent = match[1] ?? '';
      el.appendChild(word);
    } else {
      el.appendChild(document.createTextNode(chunk));
    }
  }
}

function partsOf(el: HTMLElement): HTMLElement[] {
  const words = Array.from(el.querySelectorAll<HTMLElement>('.scramble__word'));
  return words.length > 0 ? words : [el];
}

function animate(el: HTMLElement, parts: HTMLElement[], fromTexts: string[], onDone?: () => void): void {
  const previous = rafHandles.get(el);
  if (previous) cancelAnimationFrame(previous);

  const chars = el.dataset.scrambleChars || DEFAULT_CHARS;
  const queues = parts.map((part, i) => buildQueue(fromTexts[i] ?? '', part.textContent ?? ''));
  let frame = 0;
  el.classList.add('is-scrambling');

  const tick = () => {
    let completed = 0;

    queues.forEach((queue, i) => {
      let output = '';
      let done = true;

      for (const item of queue) {
        if (frame >= item.end) {
          output += item.to;
        } else {
          done = false;
          if (frame >= item.start) {
            if (!item.char || Math.random() < 0.28) item.char = randomChar(chars);
            output += item.char;
          } else {
            output += item.from;
          }
        }
      }

      if (parts[i]) parts[i].textContent = output;
      if (done) completed++;
    });

    if (completed === queues.length) {
      el.classList.remove('is-scrambling');
      rafHandles.delete(el);
      onDone?.();
    } else {
      frame++;
      rafHandles.set(el, requestAnimationFrame(tick));
    }
  };

  rafHandles.set(el, requestAnimationFrame(tick));
}

function scheduleNext(el: HTMLElement): void {
  const timer = window.setTimeout(() => {
    if (document.visibilityState === 'hidden') {
      scheduleNext(el);
      return;
    }
    advance(el);
  }, ROTATE_DELAY);
  timers.set(el, timer);
}

function advance(el: HTMLElement): void {
  const phrases = phrasesByEl.get(el) ?? [];
  if (phrases.length < 2) return;

  if (rafHandles.has(el)) {
    scheduleNext(el);
    return;
  }

  const next = ((indexByEl.get(el) ?? 0) + 1) % phrases.length;
  indexByEl.set(el, next);

  const oldTexts = partsOf(el).map((part) => part.textContent ?? '');
  render(el, phrases[next] ?? '');
  animate(el, partsOf(el), oldTexts, () => scheduleNext(el));
}

function readTemplates(el: HTMLElement): string[] {
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

    const templates = readTemplates(el);
    const phrases = expandTemplates(templates.length > 0 ? templates : [(el.textContent ?? '').trim()]);
    phrasesByEl.set(el, phrases);
    indexByEl.set(el, 0);
    render(el, phrases[0] ?? '');

    if (reducedMotion) return;

    const parts = partsOf(el);
    const blank = parts.map(() => '');
    window.setTimeout(() => animate(el, parts, blank), 250 + index * 180);

    if (phrases.length > 1) {
      window.setTimeout(() => scheduleNext(el), 900 + index * 200);
    }

    el.addEventListener('mouseover', () => {
      const timer = timers.get(el);
      if (timer) window.clearTimeout(timer);
      if (phrases.length > 1) {
        advance(el);
      } else {
        const currentParts = partsOf(el);
        animate(el, currentParts, currentParts.map(() => ''));
      }
    });
  });

  window.addEventListener('pagehide', stopTimers, { once: true });
}

initScramble();
