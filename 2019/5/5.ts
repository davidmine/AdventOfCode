console.log("-------------------------");
console.log("code time");
console.log("-------------------------");

import "./5.Prototypes";
import {Instruction, Parameter, OpCode, Command} from "./5.Classes";


var puzzleInput: string[] = "3,225,1,225,6,6,1100,1,238,225,104,0,1002,36,25,224,1001,224,-2100,224,4,224,1002,223,8,223,101,1,224,224,1,223,224,223,1102,31,84,225,1102,29,77,225,1,176,188,224,101,-42,224,224,4,224,102,8,223,223,101,3,224,224,1,223,224,223,2,196,183,224,1001,224,-990,224,4,224,1002,223,8,223,101,7,224,224,1,224,223,223,102,14,40,224,101,-1078,224,224,4,224,1002,223,8,223,1001,224,2,224,1,224,223,223,1001,180,64,224,101,-128,224,224,4,224,102,8,223,223,101,3,224,224,1,223,224,223,1102,24,17,224,1001,224,-408,224,4,224,1002,223,8,223,101,2,224,224,1,223,224,223,1101,9,66,224,1001,224,-75,224,4,224,1002,223,8,223,1001,224,6,224,1,223,224,223,1102,18,33,225,1101,57,64,225,1102,45,11,225,1101,45,9,225,1101,11,34,225,1102,59,22,225,101,89,191,224,1001,224,-100,224,4,224,1002,223,8,223,1001,224,1,224,1,223,224,223,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,8,226,677,224,1002,223,2,223,1006,224,329,1001,223,1,223,108,226,226,224,1002,223,2,223,1006,224,344,1001,223,1,223,7,677,226,224,102,2,223,223,1005,224,359,101,1,223,223,7,226,677,224,102,2,223,223,1006,224,374,101,1,223,223,1008,677,226,224,1002,223,2,223,1006,224,389,101,1,223,223,8,677,677,224,1002,223,2,223,1005,224,404,101,1,223,223,8,677,226,224,102,2,223,223,1005,224,419,1001,223,1,223,1107,677,226,224,102,2,223,223,1005,224,434,1001,223,1,223,1107,226,677,224,1002,223,2,223,1006,224,449,1001,223,1,223,107,677,226,224,1002,223,2,223,1005,224,464,1001,223,1,223,1008,677,677,224,1002,223,2,223,1006,224,479,1001,223,1,223,1108,677,226,224,1002,223,2,223,1006,224,494,1001,223,1,223,1108,677,677,224,1002,223,2,223,1006,224,509,1001,223,1,223,107,677,677,224,1002,223,2,223,1005,224,524,101,1,223,223,1007,677,226,224,102,2,223,223,1005,224,539,1001,223,1,223,1107,226,226,224,1002,223,2,223,1006,224,554,1001,223,1,223,1008,226,226,224,1002,223,2,223,1006,224,569,101,1,223,223,1108,226,677,224,1002,223,2,223,1006,224,584,101,1,223,223,108,677,677,224,1002,223,2,223,1006,224,599,1001,223,1,223,1007,677,677,224,102,2,223,223,1006,224,614,101,1,223,223,107,226,226,224,102,2,223,223,1006,224,629,101,1,223,223,1007,226,226,224,102,2,223,223,1005,224,644,1001,223,1,223,108,226,677,224,102,2,223,223,1005,224,659,1001,223,1,223,7,677,677,224,102,2,223,223,1006,224,674,1001,223,1,223,4,223,99,226".split(",");
//var puzzleInput : string[] = "01101, 2, 3, 5, 99, 0".split(",");
var input = "1";

startup(puzzleInput);

function startup(puzzleInput: string[]): void {
  var index = 0;
  var results : number[] = new Array();

  while (puzzleInput[index].toNum() != 99){
    var instruction = GetNextInstruction(puzzleInput, index, input);
    
    if (instruction.opCode.value == 4) {
      
      var parameter = instruction.parameters.find(p => p.position == 0);
      var result = parameter.mode == 0 ? puzzleInput[parameter.value].toNum() : parameter.value;
      //console.log(instruction, result);

      results.push(result);
    } else {
      puzzleInput = instruction.execute(puzzleInput);
    }

    index += instruction.parameters.length + 1;
    //console.log(index);
  }
  
  // the last item in "results" is the diagnostic code
  console.log(results);
  console.log("done");
}

function GetNextInstruction(puzzleInput : string[], index : number, input : string) {
  var opCode = new OpCode(puzzleInput[index]);
  var instruction = new Instruction(
    opCode,
    puzzleInput.slice(index + 1, index + getOpCodeParameterCount(opCode.value) + 1),
    getOpCodeExecutionFunction(opCode.value),
    input
  );
  return instruction;
}


// Infrastructure for OpCode-specific, resolving functions

let opCode1Execute : Command;
let opCode2Execute : Command;
let opCode3Execute : Command;
let opCode4Execute : Command;



// each OpCode can have a different number of parameters. This returns the proper parameter count

function getOpCodeParameterCount(opCode : number) {
  return {
    1: 3,
    2: 3,
    3: 1,
    4: 1
  }[opCode];
}

function getOpCodeExecutionFunction(opCode : number) {
  return {
    // OpCode1 Execute function
    1: (instruction : Instruction, puzzleInput : string[]) => {

      var first = instruction.parameters.find(p => p.position == 0);
      var second = instruction.parameters.find(p => p.position == 1);
      var third = instruction.parameters.find(p => p.position == 2);
    
      var firstValue = first.mode == 0 ? puzzleInput[first.value].toNum() : first.value;
      var secondValue = second.mode == 0 ? puzzleInput[second.value].toNum() : second.value;
    
      puzzleInput[third.value] = (firstValue + secondValue).toString();
    
      return puzzleInput;
    },

    // OpCode2 Execute function
    2: (instruction : Instruction, puzzleInput : string[]) => {
      var first = instruction.parameters.find(p => p.position == 0);
      var second = instruction.parameters.find(p => p.position == 1);
      var third = instruction.parameters.find(p => p.position == 2);
    
      var firstValue = first.mode == 0 ? puzzleInput[first.value].toNum() : first.value;
      var secondValue = second.mode == 0 ? puzzleInput[second.value].toNum() : second.value;
    
      puzzleInput[third.value] = (firstValue * secondValue).toString();
    
      return puzzleInput;
    },

    // OpCode 3 Execute function
    3: (instruction : Instruction, puzzleInput : string[], input : string) => {
      var first = instruction.parameters.find(p => p.position == 0);
    
      puzzleInput[first.value] = input;
      
      return puzzleInput;
    },

    // OpCode4 Execute function
    4: (instruction : Instruction, puzzleInput : string[]) => {return puzzleInput;}
  }[opCode];
}

// function calculateOpCodeParameterCount (opcode : number) {
//   switch (opcode) {
//     case 1:
//       return 3;
//     case 2:
//       return 3;
//     case 3:
//       return 1;
//     case 4:
//       return 1;
//   }
// }

// function calculateOpCodeExecutionFunction (opcode : number) {
//   switch (opcode) {
//     case 1:
//       return opCode1Execute;
//     case 2:
//       return opCode2Execute;
//     case 3:
//       return opCode3Execute;
//     case 4:
//       return opCode4Execute;
//   }
// }

// opCode1Execute = function (instruction : Instruction, puzzleInput : string[]) {
  
//   var first = instruction.parameters.find(p => p.position == 0);
//   var second = instruction.parameters.find(p => p.position == 1);
//   var third = instruction.parameters.find(p => p.position == 2);

//   var firstValue = first.mode == 0 ? puzzleInput[first.value].toNum() : first.value;
//   var secondValue = second.mode == 0 ? puzzleInput[second.value].toNum() : second.value;

//   puzzleInput[third.value] = (firstValue + secondValue).toString();

//   return puzzleInput;
// }

// opCode2Execute = function (instruction : Instruction, puzzleInput : string[]) {
//   var first = instruction.parameters.find(p => p.position == 0);
//   var second = instruction.parameters.find(p => p.position == 1);
//   var third = instruction.parameters.find(p => p.position == 2);

//   var firstValue = first.mode == 0 ? puzzleInput[first.value].toNum() : first.value;
//   var secondValue = second.mode == 0 ? puzzleInput[second.value].toNum() : second.value;

//   puzzleInput[third.value] = (firstValue * secondValue).toString();

//   return puzzleInput;
// }

// opCode3Execute = function (instruction : Instruction, puzzleInput : string[]) {
//   var first = instruction.parameters.find(p => p.position == 0);

//   // if the mode is set to "literal", store the literal at the address. We don't need to do anything when using "Address" mode because that value already exists at that location (because the source IS the destination)
//   if (first.mode != 0) {
//     puzzleInput[first.value] = first.value.toString();
//   }

//   return puzzleInput;
// }

// opCode4Execute = function (instruction : Instruction, puzzleInput : string[]) {return puzzleInput;}