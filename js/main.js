// prepare the day name
function prepareDate() {
  const date = new Date();
  // Get the day of the week as a number (0 = Sunday, 6 = Saturday)
  const dayOfWeekNumber = date.getDay();

  // Array of days of the week
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Get the day of the week as a string
  const dayOfWeekString = daysOfWeek[dayOfWeekNumber];

  return [
    daysOfWeek[dayOfWeekNumber], // today
    daysOfWeek[dayOfWeekNumber + 1 == 7 ? 0 : dayOfWeekNumber + 1], // tomorrow
    daysOfWeek[dayOfWeekNumber + 2 == 8 ? 1 : dayOfWeekNumber + 2], // after tomorrow
  ];
}

// this function show cairo when page is loaded
(async function () {
  let data = await getCurrentDay();
  display(data);
})();

// when i write inside input do this function
document
  .getElementById("searchIndput")
  .addEventListener("keyup", async function () {
    if (this.value.length >= 4) {
      let data = await getCurrentDay(this.value);
      console.log(data);
      display(data);
    }
  });

// get data depend on argument passed
async function getCurrentDay(location = "cairo") {
  let res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=4acda80e3cba426f8e2212404232008&q=${location}&aqi=yes&days=3`
  );
  let data = await res.json();
  return data;
}

// show all data in page depending on data send
function display(allData) {
  let cartona = "";
  for (let i = 0; i <= 2; i++) {
    cartona += `<div class="col-lg-4 col-md-6 mb-4 wow ${
      i == 0 ? "animate__fadeInLeft" : i == 1 ? "animate__fadeInUp" : i == 2 ? "animate__fadeInRight" : ""
    }" data-wow-delay=".3s">
    <div class="item mb-3">
        <div class="head fw-bold text-capitalize d-flex justify-content-between align-items-center p-2">
            <p class="m-0">${prepareDate()[i]}</p>
            <p class="m-0">${allData.forecast.forecastday[i].date}</p>
        </div>
        <div class="body p-3">
            <p class="mt-1 fw-bold">${allData.location.name}</p>
            <p class="my-1 degree fw-bold">${
              allData.forecast.forecastday[i].day.avgtemp_c
            }<sup>o</sup>C</p>
            <div class="icon my-1 ms-3 fs-2">
            <img class="w-25" src="${
              allData.forecast.forecastday[i].day.condition.icon
            }"/>
            </div>
            <p class="my-2 clear fw-bold">${
              allData.forecast.forecastday[i].day.condition.text
            }</p>
        </div>
        <div class="footer d-flex p-2">
            <div class="cont me-3"><i class="fa-solid fa-umbrella"></i> ${
              allData.forecast.forecastday[i].day.maxwind_kph
            }%</div>
            <div class="cont me-3"><i class="fa-solid fa-wind"></i> ${
              allData.forecast.forecastday[i].day.maxwind_mph
            }km/h</div>
            <div class="cont me-3"><i class="fa-regular fa-compass"></i> ${
              allData.forecast.forecastday[i].hour[0].wind_dir
            }</div>
        </div>
    </div>
  </div>`;
  }

  document.getElementById("myRow").innerHTML = cartona;
}
