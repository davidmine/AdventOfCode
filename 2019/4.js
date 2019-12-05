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
  range.low = parseInt(stringInput.split("-")[0]);
  range.high = parseInt(stringInput.split("-")[1]);
  return range;
}

function GeneratePotentialPasswords(range) {
  var potentialPasswords = NumbersInRangeWithoutDecrementingDigits(range.low, range.high); // generate the passwords that have non-decrementing digits
  console.log(potentialPasswords);
  potentialPasswords = potentialPasswords.filter(password => HasTwoSameDigitsInARow(password)); // filter out the ones that don't have two same digits in a row
  return potentialPasswords;
}

function NumbersInRangeWithoutDecrementingDigits(lowNumber, highNumber) {
  var validNumber = GenerateInitialNonDerementingNumber(lowNumber);
  var generatedPasswords = [];
  while (validNumber <= highNumber){

    var baseNumberAsString = (Remove9sFromEndOfNumber(validNumber) + 1).toString();
    
    if (baseNumberAsString.length < 6) {
      var lastDigit = parseInt(baseNumberAsString[baseNumberAsString.length - 1]);
      while (baseNumberAsString.length < 6) {
        baseNumberAsString += lastDigit;
      }
    }

    validNumber = parseInt(baseNumberAsString);
    generatedPasswords.push(validNumber);
  }

  return generatedPasswords;
}

function GenerateInitialNonDerementingNumber(num) {

  var numAsString = num.toString();
  var indexOfFirstDecrementDigit = 0;

  // find the index where things go wrong. If none, nothing will happen
  for (var i = 1; i < numAsString.length; i++) {
    if (parseInt(numAsString[i-1]) > parseInt(numAsString[i]) && indexOfFirstDecrementDigit == 0) {
      indexOfFirstDecrementDigit = i;
    }
  }

  // if there's a decrement between digits, overwrite the rest of the string with the last digit before the decrement
  if (indexOfFirstDecrementDigit > 0) {
    numAsString = numAsString.substr(0, indexOfFirstDecrementDigit);
    var lastDigit = numAsString[numAsString.length - 1];

    while (numAsString.length < 6) {
      numAsString += lastDigit;
    }
  }
  return parseInt(numAsString);
}

// this function will remove all the 9s from the end of the number
// for example, the number 199999 will return 1. 349 will return 34
function Remove9sFromEndOfNumber(num) {
  if (num % 10 == 9) {
    num = Remove9sFromEndOfNumber(parseInt(num / 10));
  }

  return num;
}

function HasTwoSameDigitsInARow(potentialPassword) {
  var potentialPasswordAsArray = potentialPassword.toString().split("");
  var uniqueDigitsInPotentialPassword = Array.from(new Set(potentialPasswordAsArray));

  return uniqueDigitsInPotentialPassword.some(digit => potentialPasswordAsArray.lastIndexOf(digit) - potentialPasswordAsArray.indexOf(digit) == 1);
}

