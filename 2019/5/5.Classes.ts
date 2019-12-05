

interface Command {
  execute(instruction : Instruction, puzzleInput : string[]) : string[];
}

interface Execute {
  (puzzleInput : string[]) : string[];
}


class Instruction {
  opCode : OpCode;
  parameters : Parameter[];
  execute : Execute;
  parameterLength : number;

  constructor(opCode : OpCode, rawParameters : string[], command : Command, parameterLength : number){
    this.opCode = opCode;
    var modes = this.opCode.raw.reverse().substr(2).rightPad(3, "0");
    this.parameters = rawParameters.map((value, index) => new Parameter(modes[index].toNum(), value.toNum(), index));
    this.parameterLength = parameterLength;


    this.execute = function (puzzleInput : string[]) {
      return command.execute(this, puzzleInput);
    }
  }
}

class Parameter {
  mode : number;
  value : number;
  position : number;

  constructor(mode : number, value : number, position : number) {
    this.mode = mode;
    this.value = value;
    this.position = position;
  }
}

class OpCode {
  raw : string;
  opCode : number;

  constructor(opcode : string) {
    this.raw = opcode;
    this.opCode = opcode.reverse().substr(0, 2).toNum();
  }
}

export {Instruction, Parameter, OpCode, Command};