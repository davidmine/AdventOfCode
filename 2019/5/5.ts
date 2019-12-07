console.log("-------------------------");
console.log("code time");
console.log("-------------------------");

import "./5.Prototypes";
import { Instruction, OpCode, Parameter, Command, State, CommandParams } from "./5.Classes";

var x = "3,225,1,225,6,6,1100,1,238,225,104,0,1002,36,25,224,1001,224,-2100,224,4,224,1002,223,8,223,101,1,224,224,1,223,224,223,1102,31,84,225,1102,29,77,225,1,176,188,224,101,-42,224,224,4,224,102,8,223,223,101,3,224,224,1,223,224,223,2,196,183,224,1001,224,-990,224,4,224,1002,223,8,223,101,7,224,224,1,224,223,223,102,14,40,224,101,-1078,224,224,4,224,1002,223,8,223,1001,224,2,224,1,224,223,223,1001,180,64,224,101,-128,224,224,4,224,102,8,223,223,101,3,224,224,1,223,224,223,1102,24,17,224,1001,224,-408,224,4,224,1002,223,8,223,101,2,224,224,1,223,224,223,1101,9,66,224,1001,224,-75,224,4,224,1002,223,8,223,1001,224,6,224,1,223,224,223,1102,18,33,225,1101,57,64,225,1102,45,11,225,1101,45,9,225,1101,11,34,225,1102,59,22,225,101,89,191,224,1001,224,-100,224,4,224,1002,223,8,223,1001,224,1,224,1,223,224,223,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,8,226,677,224,1002,223,2,223,1006,224,329,1001,223,1,223,108,226,226,224,1002,223,2,223,1006,224,344,1001,223,1,223,7,677,226,224,102,2,223,223,1005,224,359,101,1,223,223,7,226,677,224,102,2,223,223,1006,224,374,101,1,223,223,1008,677,226,224,1002,223,2,223,1006,224,389,101,1,223,223,8,677,677,224,1002,223,2,223,1005,224,404,101,1,223,223,8,677,226,224,102,2,223,223,1005,224,419,1001,223,1,223,1107,677,226,224,102,2,223,223,1005,224,434,1001,223,1,223,1107,226,677,224,1002,223,2,223,1006,224,449,1001,223,1,223,107,677,226,224,1002,223,2,223,1005,224,464,1001,223,1,223,1008,677,677,224,1002,223,2,223,1006,224,479,1001,223,1,223,1108,677,226,224,1002,223,2,223,1006,224,494,1001,223,1,223,1108,677,677,224,1002,223,2,223,1006,224,509,1001,223,1,223,107,677,677,224,1002,223,2,223,1005,224,524,101,1,223,223,1007,677,226,224,102,2,223,223,1005,224,539,1001,223,1,223,1107,226,226,224,1002,223,2,223,1006,224,554,1001,223,1,223,1008,226,226,224,1002,223,2,223,1006,224,569,101,1,223,223,1108,226,677,224,1002,223,2,223,1006,224,584,101,1,223,223,108,677,677,224,1002,223,2,223,1006,224,599,1001,223,1,223,1007,677,677,224,102,2,223,223,1006,224,614,101,1,223,223,107,226,226,224,102,2,223,223,1006,224,629,101,1,223,223,1007,226,226,224,102,2,223,223,1005,224,644,1001,223,1,223,108,226,677,224,102,2,223,223,1005,224,659,1001,223,1,223,7,677,677,224,102,2,223,223,1006,224,674,1001,223,1,223,4,223,99,226".split(",")
//var x = "3,9,8,9,10,9,4,9,99,-1,8".split(",");

var initialState : State = {
  puzzleInput: x,
  input: "5",
  index: 0
}

startup(initialState);

function startup(initialState: State) {
  var results : number[] = new Array();
  var state : State = initialState;

  while (state.puzzleInput[state.index].toNum() != 99){
    var instruction = GetNextInstruction(state);

    //console.log(instruction);
    
    if (instruction.opCode.value == 4) {
      
      var parameter = instruction.parameters.find(p => p.position == 0);
      var result = parameter.mode == 0 ? state.puzzleInput[parameter.value].toNum() : parameter.value;
      //console.log(instruction, result);

      results.push(result);
    }

    state = instruction.execute(state);

    console.log(state.index);
  }
  
  // the last item in "results" is the diagnostic code
  console.log(results);
  console.log("done");
}

function GetNextInstruction(params : State) {
  var opCode = new OpCode(params.puzzleInput[params.index]);
  var instruction = new Instruction(
    opCode,
    params.puzzleInput.slice(params.index + 1, params.index + getOpCodeParameterCount(opCode.value) + 1),
    getOpCodeExecutionFunction(opCode.value),
  );
  return instruction;
}


// Infrastructure for OpCode-specific, resolving functions


function getOpCodeParameterCount(opCode : number) {
  return {
    1: 3,
    2: 3,
    3: 1,
    4: 1,
    5: 2,
    6: 2,
    7: 3,
    8: 3
  }[opCode];
}

function getOpCodeExecutionFunction(opCode : number) {

  return {
    // OpCode1 Execute function
    1: (params : CommandParams) : State => {

      // get params
      var first = params.instruction.parameters.find(p => p.position == 0);
      var second = params.instruction.parameters.find(p => p.position == 1);
      var third = params.instruction.parameters.find(p => p.position == 2);
    
      // get value based on mode
      var firstValue = first.mode == 0 ? params.state.puzzleInput[first.value].toNum() : first.value;
      var secondValue = second.mode == 0 ? params.state.puzzleInput[second.value].toNum() : second.value;
    
      // modify the state
      params.state.puzzleInput[third.value] = (firstValue + secondValue).toString();

      // increment the index
      params.state.index += params.instruction.parameters.length + 1;
    
      return params.state;
    },

    // OpCode2 Execute function
    2: (params : CommandParams) : State => {

      // get params
      var first = params.instruction.parameters.find(p => p.position == 0);
      var second = params.instruction.parameters.find(p => p.position == 1);
      var third = params.instruction.parameters.find(p => p.position == 2);
    
      // get value based on mode
      var firstValue = first.mode == 0 ? params.state.puzzleInput[first.value].toNum() : first.value;
      var secondValue = second.mode == 0 ? params.state.puzzleInput[second.value].toNum() : second.value;
    
      // modify the state
      params.state.puzzleInput[third.value] = (firstValue * secondValue).toString();

      // increment the index
      params.state.index += params.instruction.parameters.length + 1;
    
      return params.state;
    },

    // OpCode3 Execute function
    3: (params : CommandParams) : State => {

       // get params
      var first = params.instruction.parameters.find(p => p.position == 0);
    
      // don't need to get the value

      // modify the state
      params.state.puzzleInput[first.value] = params.state.input;

      // increment the index
      params.state.index += params.instruction.parameters.length + 1;
      
      return params.state;
    },

    // OpCode4 Execute function
    4: (params : CommandParams) : State => {

      // do nothing

      // increment the index
      params.state.index += params.instruction.parameters.length + 1;
      return params.state;
    },

    // OpCode5 Execute function
    5: (params : CommandParams) : State => {
      var state : State = params.state;

      // get params
      var first = params.instruction.parameters.find(p => p.position == 0);
      var second = params.instruction.parameters.find(p => p.position == 1);

      // get value based on mode
      var firstValue = first.mode == 0 ? params.state.puzzleInput[first.value].toNum() : first.value;
      var secondValue = second.mode == 0 ? params.state.puzzleInput[second.value].toNum() : second.value;

      // modify the state (in this case is the same as incrementing the index)
      if (firstValue != 0) {
        state.index = secondValue;
      } else {
        state.index += params.instruction.parameters.length + 1;
      }

      return state;
    },

    // OpCode6 Execute function
    6: (params : CommandParams) : State => {
      var state : State = params.state;

      // get params
      var first = params.instruction.parameters.find(p => p.position == 0);
      var second = params.instruction.parameters.find(p => p.position == 1);

      // get value based on mode
      var firstValue = first.mode == 0 ? params.state.puzzleInput[first.value].toNum() : first.value;
      var secondValue = second.mode == 0 ? params.state.puzzleInput[second.value].toNum() : second.value;

      // modify the state (in this case is the same as incrementing the index)
      if (firstValue == 0) {
        state.index = secondValue;
      } else {
        state.index += params.instruction.parameters.length + 1;
      }

      return state;
    },

    // OpCode7 Execute function
    7: (params : CommandParams) : State => {
      var state : State = params.state;

      // get params
      var first = params.instruction.parameters.find(p => p.position == 0);
      var second = params.instruction.parameters.find(p => p.position == 1);
      var third = params.instruction.parameters.find(p => p.position == 2);
    
      // get value based on mode
      var firstValue = first.mode == 0 ? params.state.puzzleInput[first.value].toNum() : first.value;
      var secondValue = second.mode == 0 ? params.state.puzzleInput[second.value].toNum() : second.value;

      // modify the state
      firstValue < secondValue ? state.puzzleInput[third.value] = "1" : state.puzzleInput[third.value] = "0";

      // increment the index
      state.index += params.instruction.parameters.length + 1;

      return state;
    },

    // OpCode8 Execute function
    8: (params : CommandParams) : State => {
      var state : State = params.state;

      // get params
      var first = params.instruction.parameters.find(p => p.position == 0);
      var second = params.instruction.parameters.find(p => p.position == 1);
      var third = params.instruction.parameters.find(p => p.position == 2);
    
      // get value based on mode
      var firstValue = first.mode == 0 ? params.state.puzzleInput[first.value].toNum() : first.value;
      var secondValue = second.mode == 0 ? params.state.puzzleInput[second.value].toNum() : second.value;

      // modify the state
      firstValue == secondValue ? state.puzzleInput[third.value] = "1" : state.puzzleInput[third.value] = "0";

      // increment the index
      state.index += params.instruction.parameters.length + 1;

      return state;
    }
  }[opCode];
}

