let mySearchValue = document.getElementById("searchValue")

// send request depending on place
function myRequest (place){
    let myHttp = new XMLHttpRequest();
    myHttp.open("GET", `https://api.weatherapi.com/v1/forecast.json?key=de7b5255b04e40bcb69234630221401&q=${place}&days=3`)
    
    myHttp.send()

    myHttp.addEventListener("readystatechange", function(){
        if(myHttp.readyState == 4 && myHttp.status == 200){
            let data = JSON.parse(myHttp.response)
            console.log(data);  
            displayData(data)
        }
    })
}

// giv request function a value from search input using search function
function search(){
    if(mySearchValue.value !== "") myRequest(mySearchValue.value)
}

// array of elements of city in html
let myCityElement = Array.from(document.querySelectorAll(".city"))
for(let i = 0; i < myCityElement.length;i++){
    myCityElement[i].style.visibility = "hidden"
}

// array of element of day date in html
let mySpanDay =Array.from(document.querySelectorAll(".day"));
let myPartly =Array.from(document.querySelectorAll(".partly"));
let secondTemp =document.querySelector(".secondTemp")
let firstImg =document.querySelector(".firstImg")
let secondImg =document.querySelector(".secondImg")
let threetemp =document.querySelector(".threetemp")
let threeImg =document.querySelector(".threeImg")
let firstDgree =document.querySelector(".firstDgree")


function displayData(data){

    // start name city
    let city = data.location.name
    for(let i = 0; i < myCityElement.length; i++){
        if(i == 0){
            myCityElement[i].innerHTML = city
            myCityElement[i].style.visibility = "visible"
        }
        else{
            myCityElement[i].style.visibility = "hidden"
        }
    }
    // end name city

    // start date 
    let arrayOfDays = data.forecast.forecastday
    for(let i = 0; i < mySpanDay.length; i++){
        mySpanDay[i].innerHTML = arrayOfDays[i].date
    }
    // end date

    // start weather type
   let myWeatherType = data.current.condition.text
    for(let i = 0; i < myPartly.length; i++){
        if(i == 0){
            myPartly[i].innerHTML = myWeatherType;
            myPartly[i].style.visibility = "visible"; 
        }else{
            myPartly[i].style.visibility = "hidden"
        }
    }
    // end weather type

    // start second temp
    secondTemp.innerHTML = data.current.temp_c 
    secondTemp.innerHTML += "<sup>o</sup>"
    secondTemp.innerHTML += "c"
    // end second temp

    // get first icon
    console.log(data.current.condition.icon);
    firstImg.src = data.current.condition.icon
    // end first icon

    // get second icon
    let secondIcon = data.forecast.forecastday[1].day.condition.icon
    secondImg.src = secondIcon
    // end second icon

    // get thired temp
    firstDgree.innerHTML = data.forecast.forecastday[0].day.avgtemp_c 
    firstDgree.innerHTML += "<sup>o</sup>"
    firstDgree.innerHTML += "c"
    // end thired temp

    // get thired icon
        threeImg.src = data.forecast.forecastday[2].day.condition.icon
    // end thired icon


    // get first dgree
    secondTemp.innerHTML = data.current.temp_c 
    secondTemp.innerHTML += "<sup>o</sup>"
    secondTemp.innerHTML += "c"
    // end first dgree

}
