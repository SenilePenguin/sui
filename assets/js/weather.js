// https://docs.google.com/document/d/1eKCnKXI9xnoMGRRzOL1xPCBihNV2rOet08qpE_gArAY/edit

let weatherData;
fetchWeather();

const SITE = {
    Camden: '31548',
    Golden_Isles: '31525',
    Waycross: '31503',
    Jesup: '31545'
};

async function fetchWeather() {
    // TODO: Have the local file auto-update on the server (to hide API keys)
    await fetch("_weather.json")
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            weatherData = data;
        });
}

function printWeatherJson() {
    console.log(weatherData);
}

function printWeatherByDay(day) {
    if (!Number.isInteger(day) && day < 0 && day > 5) {
        console.log(`${day} is not a valid number between 0 and 5!`);
    }
    let dp = weatherData.daypart[0];

    console.log(`Day #${day} selected:`);
    console.log(`${weatherData.dayOfWeek[day]}: Low of ${weatherData.temperatureMin[day]}, High of ${weatherData.temperatureMax[day]}`);
    console.log(`${weatherData.narrative[day]}`);

    // dpIndex = day*2 & day*2+1
    let dpNow = day * 2;
    let dp12Hours = day * 2 + 1;
    console.log(`${dp.daypartName[dpNow]}: ${dp.precipChance[dpNow]}% chance of ${dp.precipType[dpNow]} (${dp.qpf[dpNow]}in)`);
    console.log(`${dp.daypartName[dp12Hours]}: ${dp.precipChance[dp12Hours]}% chance of ${dp.precipType[dp12Hours]} (${dp.qpf[dp12Hours]}in)`);
    console.log(`Icon: ${dp.iconCode[dp12Hours]}`);
}

function populateWeather(site) {
    let parentElement = document.getElementById("weatherRow1");
    let dp = weatherData.daypart[0];
    let original = parentElement.querySelector("#weatherPanel")

    for (var i = 0; i < dp.daypartName.length; i++) {
        if (dp.daypartName[i] == null) {
            continue;
        }

        var clone = original.cloneNode(true);
        var panelID = `weatherPanel_${i}`;

        clone.setAttribute("id", panelID);

        clone.querySelector(`#day`).innerText = dp.daypartName[i];
        clone.querySelector(`#icon`).src = `//www.wunderground.com/static/i/c/v4/${dp.iconCode[i]}.svg`
        clone.querySelector(`#precipChance`).innerText = dp.precipChance[i];
        clone.querySelector(`#qpf`).innerText = dp.qpf[i];
        clone.querySelector(`#precipType`).innerText = dp.precipType[i];
        clone.querySelector(`#narrative`).innerText = dp.narrative[i];

        // clone.getElementById("dayOfWeek").innerText = dp.dayOfWeek[i];

        parentElement.appendChild(clone);
    }

    original.remove();

    // addWeatherPanel(parentElement);
}

function addWeatherPanel(elementParent) {
    var original = document.getElementById("weatherPanel");
    var clone = original.cloneNode(true);
    elementParent.appendChild(clone);
}

function getWeatherWidget(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://weatherwidget.io/js/widget.min.js';
        fjs.parentNode.insertBefore(js, fjs);
    }
}

let iconIndex = 0;
function cycleIcon() {
    if (iconIndex >= 44) {
        iconIndex = 0;
    }
    var image = document.getElementById("weatherImg");
    image.src = `//www.wunderground.com/static/i/c/v4/${iconIndex}.svg`;
    iconIndex++;
}