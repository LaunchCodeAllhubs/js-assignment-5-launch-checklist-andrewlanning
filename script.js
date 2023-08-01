window.addEventListener("load", function() {
    let form = document.querySelector("[data-testid='testForm']");
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Requirement 1

        const pilot = document.getElementById("pilotName").value;
        const copilot = document.querySelector("input[name='copilotName']").value;
        const fuelLevel = document.querySelector("input[name='fuelLevel']").value;
        const cargoLevel = document.querySelector("input[name='cargoMass']").value;
        const list = document.getElementById("faultyItems");

        formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel);
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
