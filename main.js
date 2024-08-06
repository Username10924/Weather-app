"use strict";
async function generateData(city) {
  let data = {
    days: [
      {
        date: undefined,
        temp: undefined,
        description: undefined,
        icon: undefined,
      },
      {
        date: undefined,
        temp: undefined,
        description: undefined,
        icon: undefined,
      },
      {
        date: undefined,
        temp: undefined,
        description: undefined,
        icon: undefined,
      },
    ],
    misc: {
      sunRise: undefined,
      sunSet: undefined,
      timeNow: undefined,
      address: undefined,
    },
  };

  let info = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=G29TZG5GSZB37N3YJDATEJ9TD`,
    { mode: "cors" }
  );
  let info2 = await info.json();

  data.days[0].temp = info2.days[0].temp;
  data.days[0].date = info2.days[0].datetime;
  data.days[0].description = info2.days[0].description;
  data.days[0].icon = info2.days[0].icon;

  data.days[1].temp = info2.days[1].temp;
  data.days[1].date = info2.days[1].datetime;
  data.days[1].description = info2.days[1].description;
  data.days[1].icon = info2.days[1].icon;

  data.days[2].temp = info2.days[2].temp;
  data.days[2].date = info2.days[2].datetime;
  data.days[2].description = info2.days[2].description;
  data.days[2].icon = info2.days[2].icon;

  data.misc.sunRise = info2.currentConditions.sunrise;
  data.misc.sunSet = info2.currentConditions.sunset;
  data.misc.timeNow = info2.currentConditions.datetime;
  data.misc.address = info2.resolvedAddress;

  return data;
}

function getTemp(fahrenheit) {
  const unit = document.querySelector(".toggle-unit");
  let c = (fahrenheit - 32) / 1.8;
  if (unit.textContent == "Celsius") {
    return Math.round(c * 10) / 10 + " Cº";
  } else return Math.round(fahrenheit * 10) / 10 + " Fº";
}

function setTemp(data) {
  const tempDay0 = document.querySelector(".card-first .card-header .temp");
  tempDay0.textContent = getTemp(data.days[0].temp);

  const tempDay1 = document.querySelector(".card-second .card-header .temp");
  tempDay1.textContent = getTemp(data.days[1].temp);

  const tempDay2 = document.querySelector(".card-third .card-header .temp");
  tempDay2.textContent = getTemp(data.days[2].temp);
}

function setCards(data) {
  const address = document.querySelector(".address");
  address.textContent = data.misc.address;

  const iconDay0 = document.querySelector(".card-first .card-header img");
  iconDay0.src = "./icons/weather-icons/" + data.days[0].icon + ".svg";

  const dateDay0 = document.querySelector(".card-first .card-header .date");
  dateDay0.textContent = data.days[0].date + " (Today)";

  const descDay0 = document.querySelector(".card-first .description");
  descDay0.textContent = data.days[0].description;

  const iconDay1 = document.querySelector(".card-second .card-header img");
  iconDay1.src = "./icons/weather-icons/" + data.days[1].icon + ".svg";

  const dateDay1 = document.querySelector(".card-second .card-header .date");
  dateDay1.textContent = data.days[1].date + " (Tomorrow)";

  const descDay1 = document.querySelector(".card-second .description");
  descDay1.textContent = data.days[1].description;

  const iconDay2 = document.querySelector(".card-third .card-header img");
  iconDay2.src = "./icons/weather-icons/" + data.days[2].icon + ".svg";

  const dateDay2 = document.querySelector(".card-third .card-header .date");
  dateDay2.textContent = data.days[2].date;

  const descDay2 = document.querySelector(".card-third .description");
  descDay2.textContent = data.days[2].description;

  setTemp(data);
}

function setLogo(data) {
  const timeNow = data.misc.timeNow.slice(0, 2);
  const sunSet = data.misc.sunSet.slice(0, 2);
  const sunRise = data.misc.sunRise.slice(0, 2);
  const logo = document.querySelector("header img");

  if (timeNow >= sunRise && timeNow < sunSet)
    logo.src = "./icons/weather-icons/clear-day.svg";
  else logo.src = "./icons/weather-icons/clear-night.svg";
}

// initialize
const dialog = document.querySelector("dialog");
dialog.showModal();
let data = await generateData("riyadh");
dialog.close();
setCards(data);
setLogo(data);

// search button
const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", async () => {
  dialog.showModal();
  data = await generateData(document.querySelector("#search").value);
  dialog.close();
  setCards(data);
  setLogo(data);
});

// change unit
const unit = document.querySelector(".toggle-unit");
unit.addEventListener("click", async () => {
  if (unit.textContent == "Celsius") unit.textContent = "Fahrenhite";
  else unit.textContent = "Celsius";

  setTemp(data);
});
