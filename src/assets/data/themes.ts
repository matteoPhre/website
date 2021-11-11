const themes = [
    {
        "theme": "Zen White",
        "url": "https://raw.githubusercontent.com/wannabemrrobot/daily-progress/main/themes/light.json"
    },
    {
        "theme": "Dark Knight",
        "url": "https://raw.githubusercontent.com/wannabemrrobot/daily-progress/main/themes/dark.json"
    },
    {
        "theme": "Hackr Bleed",
        "url": "https://raw.githubusercontent.com/wannabemrrobot/daily-progress/main/themes/hackr.json"
    }
];


const ZenWhite = {
    "$theme": "Zen White",

    "--accent-primary": "#ff1e56",

    "--text-primary": "#444444",
    "--text-secondary": "#4d4d4d",
    "--home-heading": "#646464",
    "--heading-primary": "#3d3d3d",
    "--heading-secondary": "#444",
    "--animation-text": "#757575",
    "--badge-text": "#f8f9fa",
    "--tags": "#a0a0a0",
    "--tag-text": "#757575",
    "--tagcount-bg": "#e6e6e6",
    "--tagbg-hover": "#ff5e860c",
    "--tagbg-opaq": "#fff7f9",

    "--background": "#fff",
    "--header-bg": "#f8f9fa",
    "--subheader-bg": "#fff",
    "--border": "#d1d1d1",
    "--icons-social": "#5e5e5e",
    "--drop-shadow": "#2222224f",
    "--orb-hue": 330
};

const DarkKnigth = {
    "$theme": "Dark Knight",

    "--accent-primary": "#ff1e56",

    "--text-primary": "#dfdbd5",
    "--text-secondary": "#aca59a",
    "--home-heading": "#bdb7af",
    "--heading-primary": "#bdb7af",
    "--heading-secondary": "#444",
    "--animation-text": "#9e9689",
    "--badge-text": "#f8f9fa",
    "--tags": "#aca59a",
    "--tag-text": "#9e9689",
    "--tagcount-bg": "#26292b",
    "--tagbg-hover": "#ff5e860c",
    "--tagbg-opaq": "#231d20",

    "--background": "#181a1b",
    "--header-bg": "#1b1e1f",
    "--subheader-bg": "#181a1b",
    "--border": "#3d4245",
    "--icons-social": "#ada59b",
    "--drop-shadow": "#2222224f",
    "--orb-hue": 330
}

const HackrBleed = {
    "$theme": "Hackr Bleed",

    "--accent-primary": "#9fef00",

    "--text-primary": "#fff",
    "--text-secondary": "#a4b1cd",
    "--home-heading": "#fff",
    "--heading-primary": "#fff",
    "--heading-secondary": "#a4b1cd",
    "--animation-text": "#a4b1cd",
    "--badge-text": "#141d2b",
    "--tags": "#a4b1cd",
    "--tag-text": "#a4b1cd",
    "--tagcount-bg": "#ffffff17",
    "--tagbg-hover": "#334c2126",
    "--tagbg-opaq": "#19242a",

    "--background": "#141d2b",
    "--header-bg": "#111927",
    "--subheader-bg": "#111927",
    "--border": "#3d4245",
    "--icons-social": "#f5ffe1",
    "--drop-shadow": "#2222224f",
    "--orb-hue": 90
}

export const defaultThemesList = [ZenWhite, DarkKnigth, HackrBleed]
export default themes;