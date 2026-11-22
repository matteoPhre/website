// Client behaviour for the navigation: theme dropdown + mobile menu.
const themeButton = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
const themeMenu = document.querySelector<HTMLElement>('[data-theme-menu]');
const themeOptions = document.querySelectorAll<HTMLButtonElement>('[data-theme-option]');
const navToggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
const navLinks = document.querySelector<HTMLElement>('[data-nav-links]');

function closeThemeMenu(): void {
  if (!themeMenu || !themeButton) return;
  themeMenu.hidden = true;
  themeButton.setAttribute('aria-expanded', 'false');
}

function closeMobileMenu(): void {
  navLinks?.classList.remove('is-open');
  navToggle?.setAttribute('aria-expanded', 'false');
}

function markSelected(theme: string): void {
  themeOptions.forEach((option) => {
    option.setAttribute('aria-selected', String(option.dataset.themeOption === theme));
  });
}

markSelected(document.documentElement.dataset.theme ?? 'zen-white');

themeButton?.addEventListener('click', () => {
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

navToggle?.addEventListener('click', () => {
  closeThemeMenu();
  const open = navLinks?.classList.toggle('is-open') ?? false;
  navToggle.setAttribute('aria-expanded', String(open));
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMobileMenu);
});

// Close either menu when clicking anywhere else on the page.
document.addEventListener('click', (event) => {
  const target = event.target as Node;

  if (themeMenu && !themeMenu.hidden && !themeMenu.contains(target) && !themeButton?.contains(target)) {
    closeThemeMenu();
  }

  if (
    navLinks?.classList.contains('is-open') &&
    !navLinks.contains(target) &&
    !navToggle?.contains(target) &&
    !themeButton?.contains(target)
  ) {
    closeMobileMenu();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeThemeMenu();
    closeMobileMenu();
  }
});

// Never leave the mobile menu open when growing back to the desktop layout.
window.addEventListener('resize', () => {
  if (window.innerWidth > 760) closeMobileMenu();
});
