

interface Command {
  (instruction : Instruction, puzzleInput : string[], input : string ) : string[];
}

interface Execute {
  (puzzleInput : string[]) : string[];
}


class Instruction {
  opCode : OpCode;
  parameters : Parameter[];
  execute : Execute;
  input : string;

  constructor(opCode : OpCode, rawParameters : string[], command : Command, input : string){
    this.opCode = opCode;
    var modes = this.opCode.raw.reverse().substr(2).rightPad(3, "0");
    this.parameters = rawParameters.map((value, index) => new Parameter(modes[index].toNum(), value.toNum(), index));
    this.input = input;

    this.execute = function (puzzleInput : string[]) {
      return command(this, puzzleInput, input);
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
  value : number;

  constructor(opcode : string) {
    this.raw = opcode;
    this.value = opcode.reverse().substr(0, 2).reverse().toNum();
  }
}

export {Instruction, Parameter, OpCode, Command};