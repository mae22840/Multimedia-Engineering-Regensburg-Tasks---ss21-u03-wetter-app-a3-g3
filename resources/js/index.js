/* eslint-env browser */

/**
 * TODO:
 * 
 * - Eingaben der Nutzer*innen im Inputfeld abfangen
 * - Prüfen ob eingegebene Städte mit der OpenWeatherMap-API verwendet werden können
 * - Neues WetterWidget in Liste ergänzen, Wetterdaten für die eingegebene Stadt holen und im Widget anzeigen
 * - Hinzugefügte Stadt im LocalStorage "merken" und beim erneuten Starten der App für alle gespeicherten Städte Widgets zur liste hinzufügen
 * - Schaltflächen des Widget-Template nutzen um angezeigte Städte aktualisieren und entfernen zu können
 * - Optional: Liste per Drag & Drop sortierbar machen
 * - ...
 */

import APIClient from "./api/OpenWeatherApiClient.js";

const myStorage = localStorage;

function init() {
    console.log("### Starting Weather-App ###");
    // Starten Sie hier mit Ihrer Implementierung
    const apiClient = new APIClient(),
        inputElement = document.getElementsByClassName("add-item")[0].firstElementChild;

    if (myStorage.getItem("locations")) {
        myStorage.getItem("locations").split(", ").forEach(location => {
            apiClient.fetchWeatherDataForLocation(location).then(response => response.json()).then(data => {
                addWidget(data);
            });
        });
    }
    
    inputElement.addEventListener("keyup", async function(event) {
        if (event.key === "Enter") {
            const location = inputElement.value.charAt(0).toUpperCase() + inputElement.value.slice(1).toLowerCase();


            console.log(location);
            apiClient.fetchWeatherDataForLocation(location).then(response => response.json()).then(data => {
                if (data.cod === "404") {
                    console.log("Invalid Town");
                    return;
                }

                if (myStorage.getItem("locations") && myStorage.getItem("locations").split(", ").includes(location)) {return;}

                addWidget(data);

                if (myStorage.getItem("locations") === null || myStorage.getItem("locations") === "null") {
                    myStorage.setItem("locations", location);
                } else {
                    myStorage.setItem("locations", myStorage.getItem("locations") + ", " + location);
                }
                

                //myStorage.getItem("locations").split(", ");
                console.log(myStorage.getItem("locations"));
                console.log(data);
            });
        }});
}

function addWidget(data) {
    const widgetList = document.getElementsByClassName("widgets")[0],

    widgetTemplate = document.getElementById("weather-widget-template"),
    widget = widgetTemplate.content.firstElementChild;

    widget.setAttribute("data-city", data.name);

    widget.querySelector(".data>.main").textContent = data.name + ", " + Math.round(data.main.temp) + "°C";
    widget.querySelector(".container.min-temperature>.value").textContent = Math.floor(data.main.temp_min) + "°C";
    widget.querySelector(".container.max-temperature>.value").textContent = Math.ceil(data.main.temp_max) + "°C";
    widget.querySelector(".container.humidity>.value").textContent = data.main.humidity + "%";
    widget.querySelector(".container.pressure>.value").textContent = data.main.pressure + "hPa";
    widget.querySelector(".container.wind>.value").textContent = data.wind.speed + "m/s";

    /*widget.querySelector(".controls>.update").onclick = function() {

    };*/

    widget.querySelector(".controls>.delete").addEventListener("click", function() {
        console.log("test1");
        myStorage.setItem("locations", myStorage.getItem("locations").split(", ").filter(location => location !== data.name));
        widget.parentNode.removeChild(widget);
    });

   // eslint-disable-next-line one-var
   const clone = widgetTemplate.content.cloneNode(true);
   widgetList.appendChild(clone);
}

init();