const themesKey = "theme";
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

// Need to make the fallback the first theme in the themesData list!
let defaultFallbacks = {
    themeName: "Fallback Theme",
    colorBackground: "#ffffff",
    colorPrimary: "#222222",
    colorAccent: "#dddddd",
    colorWeatherTempMax: "red",
    colorWeatherTempMin: "blue"
}

const setValueFromLocalStorage = property => {
    let data = JSON.parse(localStorage.getItem(themesKey));
    let value = null;

    if (data != null) {
        value = data[`${property}`];
    }

    if (value === null || value == undefined) {
        console.log(`No theme data found for property ${property} - using a default of ${defaultFallbacks[property.replaceAll('-', '_')]}!`);
        setValue(property, defaultFallbacks[property]);
    } else {
        console.log(`Theme data found: ${property}=${value} `);
        setValue(property, value);
    }
}

const setTheme = options => {
    for (let option of Object.keys(options)) {
        const property = option;
        const value = options[option];

        setValue(property, value);
    }

    localStorage.setItem(themesKey, JSON.stringify(options));
}

let themeData;
async function fetchThemes() {
    await fetch("/data/themes.json")
        .then(resp => resp.json())
        .then(data => {
            themeData = data;
        });
}

async function loadTheme() {
    configureThemeButtons();

    for (var property in defaultFallbacks) {
        setValueFromLocalStorage(property);
    }
}

async function configureThemeButtons() {
    await fetchThemes();

    let dataThemeButtons = document.querySelectorAll('[data-theme]');

    for (let i = 0; i < dataThemeButtons.length; i++) {
        let name = dataThemeButtons[i].dataset.theme;

        for (let j = 0; j < themeData.themes.length; j++) {
            if (themeData.themes[j].themeName == name) {
                let background = themeData.themes[j].colorBackground;
                let primary = themeData.themes[j].colorPrimary;
                let accent = themeData.themes[j].colorAccent;

                // Set option button colors
                dataThemeButtons[i].style.background = background;
                dataThemeButtons[i].style.color = primary;
                dataThemeButtons[i].style.borderColor = accent;



                //let options = {};
                //for (var property in themeData.themes[j]) {
                //    Object.defineProperty( options, propery, { value: themeData.themes[j][property] });
                //}
                //setTheme(options);
                //setTheme(themeData.themes[j]);


                if (background != null && primary != null && accent != null) {
                    // Set callback
                    dataThemeButtons[i].addEventListener('click', () => {
                        setTheme(themeData.themes[j]);
                    });
                    //dataThemeButtons[i].addEventListener('click', () => {
                    //    setTheme({
                    //        'color_background': background ?? defaultFallbacks['color_background'],
                    //        'color-text-pri': primary ?? defaultFallbacks['color-text-pri'],
                    //        'color-text-acc': accent ?? defaultFallbacks['color-text-acc']
                    //    });
                    //    console.log(`Setting theme to ${name} - bg=${background}, pri=${primary}, acc=${accent}`);
                    //    return;
                    //});
                }
            }
        }
    }
}


