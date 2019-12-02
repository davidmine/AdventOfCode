console.log("code time");
main();

function main(){
  //getOutputFromInput(12, 2); // state of the program while it was on fire

  for(var noun = 0; noun < 100; noun++) {
    for(var verb = 0; verb < 100; verb++) {
      if (getOutputFromInput(noun, verb) == 19690720){
        console.log({"noun": noun, "verb": verb});
      }
    }
  }
  console.log("done");
}

function getOutputFromInput(noun, verb){
  var intCodeProgram = [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,6,1,19,2,19,9,23,1,23,5,27,2,6,27,31,1,31,5,35,1,35,5,39,2,39,6,43,2,43,10,47,1,47,6,51,1,51,6,55,2,55,6,59,1,10,59,63,1,5,63,67,2,10,67,71,1,6,71,75,1,5,75,79,1,10,79,83,2,83,10,87,1,87,9,91,1,91,10,95,2,6,95,99,1,5,99,103,1,103,13,107,1,107,10,111,2,9,111,115,1,115,6,119,2,13,119,123,1,123,6,127,1,5,127,131,2,6,131,135,2,6,135,139,1,139,5,143,1,143,10,147,1,147,2,151,1,151,13,0,99,2,0,14,0];
  var statefulProgram = enterInput(intCodeProgram, noun, verb);
  var i = 0;

  while (statefulProgram[i] != 99){
    // if, for some reason, the program got into an illegal state, stop the program
    if (statefulProgram[i] != 1 && statefulProgram[i] != 2) {
      console.log("illegal state");
      continue;
    }

    // get the result from a function
    var result = calculateResultOfCommand(statefulProgram, i);

    // write that result in the register that the third value points to
    var writeIndex = statefulProgram[i + 3];
    statefulProgram[writeIndex] = result;

    // increment the counter
    i = i + 4;
  }
  //console.log(statefulProgram);
  return statefulProgram[0];
}

function calculateResultOfCommand (statefulProgram, index) {

  var firstIndex = statefulProgram[index + 1];
  var secondIndex = statefulProgram[index + 2];

  var firstValue = statefulProgram[firstIndex];
  var secondValue = statefulProgram[secondIndex];

  if (statefulProgram[index] == 1){
    return firstValue + secondValue;
  } else {
    return firstValue * secondValue;
  }
}

function enterInput(intCodeProgram, noun, verb) {
  intCodeProgram[1] = noun;
  intCodeProgram[2] = verb;
  return intCodeProgram;
}