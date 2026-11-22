// Client behaviour for the navigation: theme dropdown + mobile menu.
const themeButton = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
const themeMenu = document.querySelector<HTMLElement>('[data-theme-menu]');
const themeOptions = document.querySelectorAll<HTMLButtonElement>('[data-theme-option]');
const navToggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
const navLinks = document.querySelector<HTMLElement>('[data-nav-links]');

function closeThemeMenu() {
  if (!themeMenu || !themeButton) return;
  themeMenu.hidden = true;
  themeButton.setAttribute('aria-expanded', 'false');
}

function markSelected(theme: string) {
  themeOptions.forEach((option) => {
    option.setAttribute('aria-selected', String(option.dataset.themeOption === theme));
  });
}

const initialTheme = document.documentElement.dataset.theme ?? 'zen-white';
markSelected(initialTheme);

themeButton?.addEventListener('click', (event) => {
  event.stopPropagation();
  if (!themeMenu || !themeButton) return;
  const opening = themeMenu.hidden;
  themeMenu.hidden = !opening;
  themeButton.setAttribute('aria-expanded', String(opening));
});

themeOptions.forEach((option) => {
  option.addEventListener('click', () => {
    const theme = option.dataset.themeOption;
    if (!theme) return;
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('@theme', theme);
    } catch {
      // storage may be unavailable (private mode) — theme still applies this session
    }
    markSelected(theme);
    closeThemeMenu();
  });
});

document.addEventListener('click', (event) => {
  if (!themeMenu?.contains(event.target as Node) && !themeButton?.contains(event.target as Node)) {
    closeThemeMenu();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeThemeMenu();
    navLinks?.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }
});

navToggle?.addEventListener('click', () => {
  const open = navLinks?.classList.toggle('is-open') ?? false;
  navToggle.setAttribute('aria-expanded', String(open));
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});
