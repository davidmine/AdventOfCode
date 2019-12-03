console.log("---------------------------------------");
console.log("code time");
console.log("---------------------------------------");

Main();

function Main() {
  var inputString1 = "R1004,U518,R309,D991,R436,D360,L322,U627,R94,D636,L846,D385,R563,U220,L312,D605,L612,D843,R848,U193,L671,D852,L129,D680,L946,D261,L804,D482,R196,U960,L234,U577,R206,D973,R407,D400,R44,D103,R463,U907,L972,U628,L962,U856,L564,D25,L425,U332,R931,U837,R556,U435,R88,U860,L982,D393,R793,D86,R647,D337,R514,D361,L777,U640,R833,D674,L817,D260,R382,U168,R161,U449,L670,U814,L42,U461,R570,U855,L111,U734,L699,U602,R628,D79,L982,D494,L616,D484,R259,U429,L917,D321,R429,U854,R735,D373,L508,D59,L207,D192,L120,D943,R648,U245,L670,D571,L46,D195,L989,U589,L34,D177,L682,U468,L783,D143,L940,U412,R875,D604,R867,D951,L82,U851,L550,D21,L425,D81,L659,D231,R92,D232,R27,D269,L351,D369,R622,U737,R531,U693,R295,U217,R249,U994,R635,U267,L863,U690,L398,U576,R982,U252,L649,U321,L814,U516,R827,U74,L80,U624,L802,D620,L544,U249,R983,U424,R564,D217,R151,U8,L813,D311,R203,U478,R999,U495,R957,U641,R40,U431,L830,U67,L31,U532,R345,U878,L996,D223,L76,D264,R823,U27,L776,U936,L614,U421,L398,U168,L90,U525,R640,U95,L761,U938,R296,D463,L349,D709,R428,U818,L376,D444,L748,D527,L755,U750,R175,U495,R587,D767,L332,U665,L84,D747,L183,D969,R37,D514,R949,U985,R548,U939,L170,U415,R857,D480,R836,D363,R763,D997,R721,D140,R699,U673,L724,U375,R55,U758,R634,D590,L608,U674,R809,U308,L681,D957,R30,D913,L633,D939,L474,D567,R290,D615,L646,D478,L822,D471,L952,D937,R306,U380,R695,U788,R555,D64,R769,D785,R115,U474,R232,U353,R534,D268,L434,U790,L777,D223,L168,U21,L411,D524,R862,D43,L979,U65,R771,U872,L983,U765,R162";
  var inputString2 = "L998,U952,R204,U266,R353,U227,L209,D718,L28,D989,R535,U517,L934,D711,R878,U268,L895,D766,L423,U543,L636,D808,L176,U493,R22,D222,R956,U347,R953,U468,R657,D907,R464,U875,L162,U225,L410,U704,R76,D985,L711,U176,R496,D720,L395,U907,R223,D144,R292,D523,R514,D942,R838,U551,L487,D518,L159,D880,R53,D519,L173,D449,R525,U645,L65,D568,R327,U667,R790,U131,R402,U869,R287,D411,R576,D265,R639,D783,R629,U107,L571,D247,L61,D548,L916,D397,R715,U138,R399,D159,L523,U2,R794,U699,R854,U731,L234,D135,L98,U702,L179,D364,R123,D900,L548,U880,R560,D648,L701,D928,R256,D970,L396,U201,L47,U156,R723,D759,R663,D306,L436,U508,R371,D494,L147,U131,R946,D207,L516,U514,R992,D592,L356,D869,L299,U10,R744,D13,L52,U749,R400,D146,L193,U720,L226,U973,R971,U691,R657,D604,L984,U652,L378,D811,L325,D714,R131,D428,R418,U750,L706,D855,L947,U557,L985,D688,L615,D114,R202,D746,R987,U353,R268,U14,R709,U595,R982,U332,R84,D620,L75,D885,L269,D544,L137,U124,R361,U502,L290,D710,L108,D254,R278,U47,R74,U293,R237,U83,L80,U661,R550,U886,L201,D527,L351,U668,R366,D384,L937,D768,L906,D388,L604,U515,R632,D486,L404,D980,L652,U404,L224,U957,L197,D496,R690,U407,L448,U953,R391,U446,L964,U372,R351,D786,L187,D643,L911,D557,R254,D135,L150,U833,R876,U114,R688,D654,L991,U717,R649,U464,R551,U886,L780,U293,L656,U681,L532,U184,L903,D42,L417,D917,L8,U910,L600,D872,L632,D221,R980,U438,R183,D973,L321,D652,L540,D163,R796,U404,L507,D495,R707,U322,R16,U59,L421,D255,L463,U462,L524,D703,L702,D904,L597,D385,L374,U411,L702,U804,R706,D56,L288";

  //var inputString1 = "U2,R5,D7";
  //var inputString2 = "R3,U5,R8,D4,L7";


  // wire path inputs
  var wireInput1 = inputString1.split(",");
  var wireInput2 = inputString2.split(",");

  WritePoints(wireInput1, "Wire 1");
  
  var wirePoints1 = WritePoints(wireInput1, "Wire 1");
  var wirePoints2 = WritePoints(wireInput2, "Wire 2");

  var intersections = FindAllIntersections(wirePoints1, wirePoints2);

  console.log({"Closest intersection to origin by distance": DistanceOfClosestIntersectionByDistance(intersections)});
  console.log({"Closest intersection to origin by path": DistanceOfClosestIntersectionByPath(intersections)});

}

function WritePoints(wireInput, wireName) {
  
  var initialHead = {"wire": wireName, "x": 0, "y": 0, "index": 0, "distanceTraveled" : 0};

  var listOfPoints = [initialHead];

  for (var i = 0; i < wireInput.length; i++) {
    // the instruction is the current index of the array
    var instruction = wireInput[i];

    // the head of the wire-writer is the end point of the last instruction
    var head = listOfPoints.reduce((prev, current) => prev.index > current.index ? prev : current);
    
    var nextPoint = CalculateNextPoint(head, instruction);
    listOfPoints.push(NewPoint(nextPoint));
  }

  return listOfPoints;
}

// Takes head and next location and returns the next point
function CalculateNextPoint(head, instruction) {
  var point = NewPoint(head);
  var direction = instruction.slice(0,1);
  var distance = parseInt(instruction.slice(1));

  if (direction == "U" || direction == "D") {
    direction == "U" ? point.y += distance : point.y -= distance;
  } else {
    direction == "R" ? point.x += distance : point.x -= distance;
  }

  point.index++;
  point.distanceTraveled += distance;

  return point;
}

function DetermineIntersectionOfTwoLines(wire1Point1, wire1Point2, wire2Point1, wire2Point2) {
  /*
    given two lines (designated by a total of four points), an intersection occurs if the following is true
    W = wire
    P = point
    X/Y are the coordinates
    (W1P1.x - W2P1.x) > 0 = !((W1P2.x - W2P2.x) > 0) && (W1P1.y - W2P1.y) > 0 = !((W1P2.y - W2P2.y) > 0)
  */
  return (wire1Point1.x - wire2Point1.x) > 0 == !((wire1Point2.x - wire2Point2.x) > 0) && 
         (wire1Point1.y - wire2Point1.y) > 0 == !((wire1Point2.y - wire2Point2.y) > 0)
}

function FindSingleIntersection(wire1Point1, wire1Point2, wire2Point1, wire2Point2) {
  /*
    Distance traveled is the trickiest part.
    The distance traveled can best be thought of by thinking about vertical and horizontal lines.
    For a vertical line, the total path traveled is the path up to the first point summed with the partial path until the intersection.
    Because the intersection takes place at the "Y" coordinate of ANY point on the horizontal line, we just need to calculate the difference between the first vertical "Y" coordinate and ANY horizontal "Y" coordinate.
    The same logic is used for the "X" coordinate.
  */
  var point = {"x": 0, "y": 0, "wire1DistanceTraveled": 0, "wire2DistanceTraveled": 0};
  if (wire1Point1.x - wire1Point2.x == 0) { // wire 1 is vertical and wire 2 is horizontal
    point.x = wire1Point1.x; 
    point.y = wire2Point1.y;
    point.wire1DistanceTraveled = wire1Point1.distanceTraveled + (Math.abs(wire1Point1.y - wire2Point1.y))
    point.wire2DistanceTraveled = wire2Point1.distanceTraveled + (Math.abs(wire2Point1.x - wire1Point1.x))
  } else { // wire 1 is horizontal and wire 2 is vertical
    point.x = wire2Point1.x;
    point.y = wire1Point1.y;
    point.wire1DistanceTraveled = wire1Point1.distanceTraveled + (Math.abs(wire1Point1.x - wire2Point1.x))
    point.wire2DistanceTraveled = wire2Point1.distanceTraveled + (Math.abs(wire2Point1.y - wire1Point1.y))
  }

  return point;
}

function FindAllIntersections(wirePoints1, wirePoints2) {
  var results = [];

  wirePoints1.forEach(point1 => {
    if (point1.index > 0) {
      var wire1Point1 = wirePoints1.find(w1p1 => w1p1.index == point1.index - 1);
      var wire1Point2 = point1;

      wirePoints2.forEach(point2 => {
        if (point2.index > 0) {
          var wire2Point1 = wirePoints2.find(w2p1 => w2p1.index == point2.index - 1);
          var wire2Point2 = point2;

          if (DetermineIntersectionOfTwoLines(wire1Point1, wire1Point2, wire2Point1, wire2Point2)) {
            results.push(FindSingleIntersection(wire1Point1, wire1Point2, wire2Point1, wire2Point2));
          }
        }
      });
    }
  });

  return results;
}

function DistanceOfClosestIntersectionByDistance(intersections){
  var distances = [];
  intersections.forEach(point => distances.push(Math.abs(point.x) + Math.abs(point.y)));

  return Math.min.apply(Math, distances);
}

function DistanceOfClosestIntersectionByPath(intersections) {
  var steps = [];
  intersections.forEach(point => steps.push(point.wire1DistanceTraveled + point.wire2DistanceTraveled));

  return Math.min.apply(Math, steps);
}

function NewPoint(point) {
  return {"wire": point.wire, "x": point.x, "y": point.y, "index": point.index, "distanceTraveled" : point.distanceTraveled};
}
