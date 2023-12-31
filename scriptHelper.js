require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    const missionTarget = document.getElementById("missionTarget");

    const html = `
<h2>Mission Destination</h2>
    <ol>
        <li>Name:${name} </li>
        <li>Diameter: ${diameter} </li>
        <li>Star: ${star}</li>
        <li>Distance from Earth: ${distance} </li>
        <li>Number of Moons: ${moons}</li>
    </ol>
<img src="${imageUrl}">
                `;

    missionTarget.innerHTML = html;
}

function validateInput(testInput) {
    if (!testInput) {
        return "Empty";
    } else if (isNaN(testInput)) {
        return "Not a Number";
    } else if (!isNaN(testInput)) {
        return "Is a Number";
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    const pilotStatus = document.getElementById("pilotStatus")
    const copilotStatus = document.getElementById("copilotStatus")
    const fuelStatus = document.getElementById("fuelStatus");
    //const faultyItems = document.getElementById("faultyItems");
    const launchStatus = document.getElementById("launchStatus");
    const cargoStatus = document.getElementById("cargoStatus");

    if (!pilot || !copilot || !fuelLevel || !cargoLevel) { // Add an alert to notify the user that all fields are required.
        alert("All fields are required!");
    } else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number" || validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
        alert("Make sure to enter valid information for each field!");
    } else {
        pilotStatus.textContent = `Pilot ${pilot} is ready for launch`
        copilotStatus.textContent= `Co-pilot ${copilot} is ready for launch`
        list.style.visibility = "visible"; // change faultyItems to visible
        if (Number(fuelLevel) <10000) {
            fuelStatus.textContent = "Not enough fuel for the journey."; // with an updated status stating that there is not enough fuel for the journey.
            launchStatus.textContent = "Shuttle Not Ready for Launch"; // The text of the h2 element, launchStatus, should also change to "Shuttle not ready for launch"
            launchStatus.style.color = "red"; // The color should change to red
        }else{
            fuelStatus.textContent = "Fuel level high enough for launch";
        }
        if (Number(cargoLevel) > 10000) {
            cargoStatus.textContent = "Cargo mass too heavy for launch"; // with an updated cargo status stating that there is too much mass for the shuttle to take off.
            launchStatus.textContent = "Shuttle Not Ready for Launch"; // The text of launchStatus should also change to "Shuttle not ready for launch"
            launchStatus.style.color = "rgb(199, 37, 78)"; // The color should change to a particular shade of red, #37254E.
        }else{
            cargoStatus.textContent = "Cargo mass low enough for launch";
        }
        if (cargoStatus.textContent === "Cargo mass low enough for launch" && fuelStatus.textContent === "Fuel level high enough for launch") {
            launchStatus.textContent = "Shuttle is Ready for Launch";
            launchStatus.style.color = "rgb(65, 159, 106)";
        }
    }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json()
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    const i = Math.floor(Math.random() * planets.length);
    return planets[i]
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
