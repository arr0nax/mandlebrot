var magnificationFactor = 100;
var panX = -0.2576403924732034;
var panY =  0.0011960709666803428;
var myCanvas;
var ctx;
var coords;
var buttonCount = 0;
var savedPoints = [];


document.addEventListener("DOMContentLoaded", function(event) {
  //do work
  coords = document.createTextNode("x: "+panX+", y: "+panY+", magnification factor: "+magnificationFactor)
  document.body.appendChild(coords);

  // Create Canvas
  myCanvas = document.createElement("canvas");

  myCanvas.width=1000;
  myCanvas.height=1000;
  document.body.appendChild(myCanvas);
  ctx = myCanvas.getContext("2d");



  document.addEventListener("keydown", keyDownHandler, false);
  // Start drawing
  draw();
  });

  function draw() {

    for(var x=-myCanvas.width/2; x < myCanvas.width/2; x += 10) {
      for(var y=-myCanvas.height/2; y < myCanvas.height/2; y += 10) {
        var belongsToSet =
        checkIfBelongsToMandelbrotSet((x/10)/magnificationFactor - panX,
          (y/10)/magnificationFactor - panY);
          if(belongsToSet === 0) {
            ctx.fillStyle = '#000';
            ctx.fillRect(x+myCanvas.width/2,y+myCanvas.height/2, 10,10); // Draw a black pixel
          } else {
            ctx.fillStyle = 'hsl('+(belongsToSet*3.6)+', 100%, ' + (belongsToSet) + '%)';
            ctx.fillRect(x+myCanvas.width/2,y+myCanvas.height/2, 10,10); // Draw a colorful pixel
          }
        }
      }

      coords.nodeValue = ("x: "+panX+", y: "+panY+", magnification factor: "+magnificationFactor);
  }

  function checkIfBelongsToMandelbrotSet(x,y) {
    var realComponentOfResult = x;
    var imaginaryComponentOfResult = y;
    var maxIterations = getBaseLog(1.1, magnificationFactor);
    for(var i = 0; i < maxIterations; i++) {
      var tempRealComponent = realComponentOfResult * realComponentOfResult - imaginaryComponentOfResult * imaginaryComponentOfResult + x;
      var tempImaginaryComponent = 2 * realComponentOfResult * imaginaryComponentOfResult + y;
      realComponentOfResult = tempRealComponent;
      imaginaryComponentOfResult = tempImaginaryComponent;

      // Return a number as a percentage
      if(realComponentOfResult * imaginaryComponentOfResult > 5)
      return (i/maxIterations * 100);
    }
    return 0;   // Return zero if in set
}

function reply_click(id) {
  panX = savedPoints[parseInt(id)].x;
  panY = savedPoints[parseInt(id)].y;
  magnificationFactor = savedPoints[parseInt(id)].zoom;
  draw();
}

function origin() {
  panX = 0;
  panY = 0;
  magnificationFactor = 100;
  draw();
}

function clear2() {
  buttonCount = 0;
  var myNode = document.getElementById("buttonContainer");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
}

function save() {
  button = document.createElement("button");
  document.getElementById("buttonContainer").appendChild(button);
  button.innerHTML = buttonCount;
  button.id = buttonCount++;
  button.onclick = function() {reply_click(this.id);};
  savedPoints.push({x: panX, y: panY, zoom: magnificationFactor});
}

function keyDownHandler(e) {
  switch (e.keyCode) {
    case 68:
      panX -= 10/magnificationFactor;
      draw();
      break;
    case 65:
      panX += 10/magnificationFactor;
      draw();
      break;
    case 83:
      panY -= 10/magnificationFactor;
      draw();
      break;
    case 87:
      panY += 10/magnificationFactor;
      draw();
      break;
    case 38:
      magnificationFactor -= magnificationFactor/10;
      draw();
      break;
    case 40:
      magnificationFactor += magnificationFactor/10;
      draw();
      break;
    case 80:
      save();
      break;
      case 48:
        reply_click(0);
        break;
        case 49:
          reply_click(1);
          break;
          case 50:
            reply_click(2);
            break;
            case 51:
              reply_click(3);
              break;
              case 52:
                reply_click(4);
                break;
                case 53:
                  reply_click(5);
                  break;
                  case 54:
                    reply_click(6);
                    break;
                    case 55:
                      reply_click(7);
                      break;
                      case 56:
                        reply_click(8);
                        break;
                        case 57:
                          reply_click(9);
                          break;

    default:
      break;

  }
}

function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}
