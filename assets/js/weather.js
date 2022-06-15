// https://docs.google.com/document/d/1eKCnKXI9xnoMGRRzOL1xPCBihNV2rOet08qpE_gArAY/edit

let container = document.getElementById("weatherRow");
let templateToday = document.getElementById("templateWeatherToday");
let templateOther = document.getElementById("templateWeatherOtherDay");
let degrees = "F";
let weatherData;
fetchWeather();
addWeatherForecast()

async function fetchWeather() {
    // TODO: Have the local file auto-update on the server (to hide API keys)
    await fetch("_weather.json")
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            weatherData = data;
        });
}

async function validateWeather() {
    if (weatherData == null) {
        await fetchWeather();
    }
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


async function addWeatherForecast(weatherRow) {
    await validateWeather();

    for (var i = 0; i < weatherData.dayOfWeek.length; i++) {
        let panel;// = templateOther.content.firstElementChild.cloneNode(true);

        if (i == 0) {
            panel = templateToday.content.firstElementChild.cloneNode(true);
            panel.setAttribute("class", "today");
        } else {
            panel = templateOther.content.firstElementChild.cloneNode(true);
        }

        panel.setAttribute("id", `waycross_${weatherData.dayOfWeek[i]}`);

        panel.querySelector(`#fullDayName`).innerText = weatherData.dayOfWeek[i];
        panel.querySelector(`#abrDayName`).innerText = weatherData.dayOfWeek[i].substring(0, 3);
        panel.querySelector(`#icon`).src = `//www.wunderground.com/static/i/c/v4/26.svg`
        panel.querySelector(`#degreesHigh`).innerText = `${weatherData.temperatureMax[i]}\u00B0${degrees}` ?? "NULL";
        panel.querySelector(`#degreesLow`).innerText = `${weatherData.temperatureMin[i]}\u00B0${degrees}` ?? "NULL";
        //clone.querySelector(`#precipChance`).innerText = dp.precipChance[i];
        //clone.querySelector(`#qpf`).innerText = dp.qpf[i];
        //clone.querySelector(`#precipType`).innerText = dp.precipType[i];
        //clone.querySelector(`#narrative`).innerText = dp.narrative[i];

        container.appendChild(panel);
    }
}