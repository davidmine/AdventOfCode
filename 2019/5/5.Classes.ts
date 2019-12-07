
interface State {
  puzzleInput : string[];
  input : string;
  index : number;
}

interface CommandFunction {
  (params : CommandParams ) : State;
}

interface CommandParams {
  instruction : Instruction;
  state : State;
}

class Instruction {
  opCode : OpCode;
  parameters : Parameter[];
  execute : (params : State) => State;

  constructor(opCode : OpCode, rawParameters : string[], command : CommandFunction) {
    this.opCode = opCode;
    var modes = this.opCode.raw.reverse().substr(2).rightPad(3, "0");
    this.parameters = rawParameters.map((value, index) => new Parameter(modes[index].toNum(), value.toNum(), index));

    this.execute = function (params : State) {
      
      var commandParams : CommandParams = {
        instruction: this,
        state: params
      };

      return command(commandParams);
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

enum Mode {
  Position,
  Literal
}

export {Instruction, OpCode, State, CommandParams, Mode};