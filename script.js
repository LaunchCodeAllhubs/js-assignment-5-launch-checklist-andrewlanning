window.addEventListener("load", function() {
    let form = document.querySelector("[data-testid='testForm']");
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Requirement 1

        const pilot = document.getElementById("pilotName").value;
        const copilot = document.querySelector("input[name='copilotName']").value;
        const fuelLevel = document.querySelector("input[name='fuelLevel']").value;
        const cargoLevel = document.querySelector("input[name='cargoMass']").value;

        if (!pilot || !copilot || !fuelLevel || !cargoLevel) { // Add an alert to notify the user that all fields are required.
            window.alert("All fields are required!");
            return;
        }

        if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number" || validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
            window.alert("Make sure to enter valid information for each field!")
            return;
        }

        formSubmission(document, pilot, copilot, fuelLevel, cargoLevel);
   })

    let listedPlanets;
    let listedPlanetsResponse = myFetch();

    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets);

   }).then(function () {
        console.log(listedPlanets);
        const selectedPlanet = pickPlanet(listedPlanets);
        addDestinationInfo(
            document,
            selectedPlanet.name,
            selectedPlanet.diameter,
            selectedPlanet.star,
            selectedPlanet.distance,
            selectedPlanet.moons,
            selectedPlanet.image
        )
   })
});