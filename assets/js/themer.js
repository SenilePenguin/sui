const setValue = (property, value) => {
    if (value) {
        document.documentElement.style.setProperty(`--${property}`, value);

        const input = document.querySelector(`#${property}`);
        if (input) {
            value = value.replace('px', '');
            input.value = value;
        }
    }
};

const setValueFromLocalStorage = property => {
    let value = localStorage.getItem(property);
    setValue(property, value);
};

const setTheme = options => {
    for (let option of Object.keys(options)) {
        const property = option;
        const value = options[option];

        setValue(property, value);
        localStorage.setItem(property, value);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
});

let themeData;
async function fetchThemes() {
    await fetch("themes.json")
        .then(resp => resp.json())
        .then(data => {
            // console.log(data.themes);
            themeData = data;
        });
}

async function loadTheme() {
    configureThemeButtons();
    if (localStorage.getItem("color-background") === null) {
        console.log("No saved theme found. Setting to White.");
        setTheme({
            'color-background': "#ffffff",
            'color-text-pri': "#222222",
            'color-text-acc': "#dddddd"
        });
    } else {
        setValueFromLocalStorage('color-background');
        setValueFromLocalStorage('color-text-pri');
        setValueFromLocalStorage('color-text-acc');
    }
}

async function configureThemeButtons() {
    await fetchThemes();

    let dataThemeButtons = document.querySelectorAll('[data-theme]');

    for (let i = 0; i < dataThemeButtons.length; i++) {
        let name = dataThemeButtons[i].dataset.theme;        

        for (let j = 0; j < themeData.themes.length; j++) {
            if (themeData.themes[j].name == name) {
                let background = themeData.themes[j].background;
                let primary = themeData.themes[j].primary;
                let accent = themeData.themes[j].accent;

                if (background != null && primary != null && accent != null) {
                    // Set callback
                    dataThemeButtons[i].addEventListener('click', () => {
                        setTheme({
                            'color-background': background,
                            'color-text-pri': primary,
                            'color-text-acc': accent
                        });
                        console.log(`Setting theme to ${name} - bg=${background}, pri=${primary}, acc=${accent}`);
                        return;
                    });

                    // Set option button colors
                    dataThemeButtons[i].style.background = background;
                    dataThemeButtons[i].style.color = primary;
                    dataThemeButtons[i].style.borderColor = accent;
                }
            }
        }        
    }
}


