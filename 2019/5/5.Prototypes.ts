declare interface String {
  rightPad(size : number, fill : string) : string;
  reverse() : string;
  toNum() : number;
}

String.prototype.rightPad = function(this : string, size : number, fill : string) : string {
  var num = this;
    while (num.length < size) num = num + fill;
    return num;
}

String.prototype.reverse = function () {
  return this.split('').reverse().join('');
}

String.prototype.toNum = function() {
  return parseInt(this);
}

