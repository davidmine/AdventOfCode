console.log("-------------------------");
console.log("code time");
console.log("-------------------------");

// Correct answer for step 1 = 921
// Correct answer for step 2 = 603
// The difference between step 1 and step 2 is that duplicate adjacent digits no longer count if there is a third, fourth, fifth, or sixth duplicate. However, this does not disqualify the potential password necessarily.

var puzzleInput = "278384-824795";
startup(puzzleInput);

function startup(puzzleInput){
  var range = CalculateRange(puzzleInput);
  var potentialPasswords = GeneratePotentialPasswords(range);

  console.log({potentialPasswords: potentialPasswords, count: potentialPasswords.length});
}

function CalculateRange(stringInput) {
  var range = {low: 0, high: 0};
  range.low = stringInput.split("-")[0];
  range.high = stringInput.split("-")[1];
  return range;
}

function GeneratePotentialPasswords(range) {
  var potentialPasswords = [];
  for (var i = range.low; i <= range.high; i++){
    if (IsPotentialPassword(i)) {
      potentialPasswords.push(i);
    }
  }
  return potentialPasswords;
}

function IsPotentialPassword(potentialPassword) {
  console.log(potentialPassword);
  if (!IsIncreasingDigitValue(potentialPassword) || !HasTwoSameDigitsInARow(potentialPassword)){
    return false;
  }

  return true;
}

function IsIncreasingDigitValue(potentialPassword) {
  var potentialPasswordAsArray = potentialPassword.toString();
  return parseInt(potentialPasswordAsArray[0]) <= parseInt(potentialPasswordAsArray[1]) &&
         parseInt(potentialPasswordAsArray[1]) <= parseInt(potentialPasswordAsArray[2]) &&
         parseInt(potentialPasswordAsArray[2]) <= parseInt(potentialPasswordAsArray[3]) &&
         parseInt(potentialPasswordAsArray[3]) <= parseInt(potentialPasswordAsArray[4]) &&
         parseInt(potentialPasswordAsArray[4]) <= parseInt(potentialPasswordAsArray[5]);
}

function HasTwoSameDigitsInARow(potentialPassword) {
  var potentialPasswordAsArray = potentialPassword.toString().split("");
  var uniqueDigitsInPotentialPassword = Array.from(new Set(potentialPasswordAsArray));

  return uniqueDigitsInPotentialPassword.some(digit => potentialPasswordAsArray.lastIndexOf(digit) - potentialPasswordAsArray.indexOf(digit) == 1);

