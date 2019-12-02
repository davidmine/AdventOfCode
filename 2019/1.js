console.log("code time");

var moduleMass = [139195,139828,68261,122523,122363,92345,57517,96771,109737,106466,79011,131515,77564,128967,76455,140143,94188,102483,116410,102343,75009,132926,124193,141396,94715,144192,61123,112401,139101,99152,124424,95233,92024,145901,101966,113963,79648,76216,140625,72982,89179,123060,133118,96191,55839,141615,107191,130028,65641,106080,122329,63873,56237,55959,71941,86453,50127,61463,128084,127326,118094,69727,96157,85522,122926,90449,108978,69085,119108,81331,143962,119929,100978,77036,99555,77342,75274,148490,94110,104057,142323,87000,123416,113491,69569,136231,124140,62041,130474,77480,76624,111762,117950,144316,149407,96042,63783,62694,142257,92563];
var fuelForModuleMass = [];
var fuelForFuelMass = [];

function calculateFuelForMass(mass){
    return (Math.floor(mass / 3)) - 2;
}

function calculateFuelForFuel(fuelMass) {
    /*
    This function takes in an amount of fuel mass.
    The mass of the fuel is calculated to see if additional fuel is needed for the initial mass of fuel
    If additional fuel is needed, call the funciton recurisvily.
    The recursive function will break once the amount of fuel needed for the fuel needed for the fuel... is 0 or less.
    */
    var fuelForFuel = calculateFuelForMass(fuelMass);

    // if the next one will be negative, stop the recursion.
    if (calculateFuelForMass(fuelForFuel) > 0) {
        fuelForFuel += calculateFuelForFuel(fuelForFuel);
    }
    return fuelForFuel;
}

// for each module mass, make an array of the fuel needed to move the module's mass
moduleMass.forEach(mass => fuelForModuleMass.push(calculateFuelForMass(mass)));

// for each fuelMass in fuelForModuleMass, make an array of fuel needed to move the fuel's mass
fuelForModuleMass.forEach(fuelMass => fuelForFuelMass.push(calculateFuelForFuel(fuelMass)));

var moduleFuelSum = 0;
moduleFuelSum += fuelForModuleMass.reduce((a,b) => a + b, 0);
moduleFuelSum += fuelForFuelMass.reduce((a,b) => a + b, 0);

console.log(moduleFuelSum);