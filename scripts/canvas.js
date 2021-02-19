let ctx = canv.getContext("2d");
let scale = 1;
let plotBorderWidth = 2;
let plotInfillWidth = 0.5;

var global = {
	scale	: 1,
	offset	: {
		x : 0,
		y : 0,
	},
};
var pan = {
	start : {
		x : null,
		y : null,
	},
	offset : {
		x : 0,
		y : 0,
	},
};

//DRAW SUPPORTS
function drawHingedSupport(ctx, x, y) {
  ctx.strokeStyle = "#0000AA";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + 20, y + 20);
  ctx.lineTo(x - 20, y + 20);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x, y, 4, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'black';
  ctx.fill()
  ctx.stroke()

  ctx.lineWidth = 4;
  ctx.strokeStyle = "#000000";
  ctx.beginPath();
  ctx.moveTo(x - 28, y + 22);
  ctx.lineTo(x + 28, y + 22);
  ctx.closePath();
  ctx.stroke();
}

function drawRollerSupport(ctx, x, y) {
  drawHingedSupport(ctx, x, y);

  ctx.beginPath();
  ctx.moveTo(x - 28, y + 30);
  ctx.lineTo(x + 28, y + 30);
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#000000";
  ctx.closePath();
  ctx.stroke();
}

function drawLeftFixedSupport(ctx, x, y) {
  ctx.beginPath();
  ctx.moveTo(x - 4, y - 30);
  ctx.lineTo(x - 4, y + 30);
  ctx.lineWidth = 8;
  ctx.strokeStyle = "#0000AA";
  ctx.closePath();
  ctx.stroke();
}

function drawRightFixedSupport(ctx, x, y) {
  ctx.beginPath();
  ctx.lineWidth = 8;
  ctx.strokeStyle = "#0000AA";
  ctx.moveTo(x + 4, y - 30);
  ctx.lineTo(x + 4, y + 30);
  ctx.closePath();
  ctx.stroke();
}

// DRAW BEAM
function drawBeam(ctx, x, y, length) {
  ctx.beginPath();
  ctx.lineWidth = 6;
  ctx.strokeStyle = "rgb(88, 52, 9)";
  ctx.moveTo(x, y);
  ctx.lineTo(x + length * scale, y);
  ctx.closePath();
  ctx.stroke();
}

//DRAW FORCES
function drawArrow(ctx, x, y, force, angle, isScaled=true, color="black") {
  let dir;
  if (force >= 0) {
    dir = 1;
  } else {
    dir = -1;
  }

  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.moveTo(0, 0 - 4 * dir);
  ctx.lineTo(0 - 5, 0 - 15 * dir);
  ctx.lineTo(0 + 5, 0 - 15 * dir);
  ctx.closePath;
  ctx.fill();
  ctx.beginPath()
  ctx.moveTo(0,  0 - 15 * dir);
  if (isScaled) {
    ctx.lineTo(0, 0 - Math.max(force * dir, 40) * dir);
  } else {
    ctx.lineTo(0, 0 - 40 * dir);
  }
  ctx.stroke()

  ctx.rotate(-angle);
  
  let dXText;
  let dYText;
  if (isScaled) {
    dXText = -Math.max(force * dir, 40) * Math.sin(-angle) + 10;
    dYText = -Math.max(force * dir, 40) * Math.cos(-angle) - 10;
  } else {
    dXText = -40 * Math.sin(-angle) + 10;
    dYText = -40 * Math.cos(-angle) - 10;
  }
  ctx.font = "16px Lato";
  ctx.fillStyle = color;
  ctx.fillText(`${Math.abs(Math.round(force * 1000) / 1000)} kN`, (dXText)*dir, dYText * dir);
  ctx.translate(-x, -y);
}

function drawMomentArrow(ctx, x, y, force, drawLine, color) {
  let dir;
  if (force >= 0) {
    dir = 1;
  } else {
    dir = -1;
  }
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.arc(x, y, 30, Math.PI*5/4, Math.PI *7/4, false);
  ctx.stroke();

  ctx.beginPath();
    ctx.moveTo(x + 30*Math.sin(Math.PI/4) * dir, y - 30*Math.sin(Math.PI/4));
    ctx.lineTo(x + (30*Math.sin(Math.PI/4) - 3) * dir, y - 30*Math.sin(Math.PI/4) - 8);
    ctx.lineTo(x + (30*Math.sin(Math.PI/4) - 8) * dir, y - 30*Math.sin(Math.PI/4) - 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

  if (drawLine) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 30*Math.sin(Math.PI/4) * dir, y - 30*Math.sin(Math.PI/4));
    ctx.stroke();
  }

  ctx.font = "16px Lato";
  ctx.fillStyle = color;
  ctx.fillText(`${Math.abs(Math.round(force * 1000) / 1000)} kNm`, x, y-40);
}

// DRAW PLOTS
function drawMoments(ctx, x, y, steps, shears, plotScale) {
  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.lineWidth = plotBorderWidth;
  ctx.moveTo(x, y);
  for (let i=0; i <= 1000; i++) {
    ctx.lineTo(x + steps[i] * scale, y + (beam.leftReactions.moment + shears[i]) * plotScale * scale)
  }
  ctx.lineTo(x + steps[PRECISION] * scale, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.lineWidth = plotInfillWidth;
  for (let i = 0; i <= 1000; i++) {
    if (i%60 == 0) {
      ctx.moveTo(x+steps[i] * scale, y + (beam.leftReactions.moment + shears[i]) * plotScale * scale)
      ctx.lineTo(x+steps[i] * scale, y)
    }
  }
  ctx.stroke();
}

function drawShears(ctx, x, y, steps, shears, plotScale) {
  ctx.beginPath();
  ctx.strokeStyle = "blue";
  ctx.lineWidth = plotBorderWidth;
  ctx.moveTo(x, y);
  for (let i=0; i <= 1000; i++) {
    ctx.lineTo(x + steps[i] * scale, y - shears[i] * plotScale * scale)
  }
  ctx.lineTo(x + steps[PRECISION] * scale, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.lineWidth = plotInfillWidth;
  for (let i = 0; i <= 1000; i++) {
    if (i%60 == 20) {
      ctx.moveTo(x+steps[i] * scale, y-shears[i] * plotScale * scale)
      ctx.lineTo(x+steps[i] * scale, y)
    }
  }
  ctx.stroke();
}

function drawTensions(ctx, x, y, steps, tensions, plotScale) {
  ctx.beginPath();
  ctx.strokeStyle = "green";
  ctx.lineWidth = plotBorderWidth;
  ctx.moveTo(x, y);
  for (let i = 0; i <= 1000; i++) {
    ctx.lineTo(x + steps[i] * scale, y - tensions[i] * plotScale * scale)
  }
  ctx.lineTo(x+steps[PRECISION] * scale, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.lineWidth = plotInfillWidth;
  for (let i = 0; i <= 1000; i++) {
    if (i%60 == 40) {
      ctx.moveTo(x+steps[i] * scale, y-tensions[i] * plotScale * scale)
      ctx.lineTo(x+steps[i] * scale, y)
    }
  }
  ctx.stroke();
}


// DRAW ENTIRE BEAM WITH SUPPORTS
function drawSystem() {
  let plotScale = parseFloat(graphScaleBox.value);
  // pan
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canv.width, canv.height);
  ctx.translate(pan.offset.x, pan.offset.y);

  // beam
  drawBeam(ctx, DEF_X, DEF_Y, beam.length);

  // supports
  if (beam.leftSupport == SUPPORT.HINGED) {
    drawHingedSupport(ctx, DEF_X, DEF_Y);
  } else if (beam.leftSupport == SUPPORT.ROLLER) {
    drawRollerSupport(ctx, DEF_X, DEF_Y);
  } else if (beam.leftSupport == SUPPORT.FIXED) {
    drawLeftFixedSupport(ctx, DEF_X, DEF_Y);
  }
  if (beam.rightSupport == SUPPORT.HINGED) {
    drawHingedSupport(ctx, DEF_X + beam.length * scale, DEF_Y);
  } else if (beam.rightSupport == SUPPORT.ROLLER) {
    drawRollerSupport(ctx, DEF_X + beam.length * scale, DEF_Y);
  } else if (beam.rightSupport == SUPPORT.FIXED) {
    drawRightFixedSupport(ctx, DEF_X + beam.length * scale, DEF_Y);
  }

  // plots
  if (shearsCheckbox.checked) {
    drawShears(ctx, DEF_X, DEF_Y, beam.steps, beam.shears, plotScale);
  }
  if (momentsCheckbox.checked) {
    drawMoments(ctx, DEF_X, DEF_Y, beam.steps, beam.moments, plotScale);
  }
  if (tensionsCheckbox.checked) {
    drawTensions(ctx, DEF_X, DEF_Y, beam.steps, beam.tensions, plotScale);
  }

  // point loads
  for (let i = 0; i < loadsList.length; i++) {
    drawArrow(ctx, DEF_X + loadsList[i].distance * scale, DEF_Y, loadsList[i].loadValue, loadsList[i].angle - Math.PI / 2);
  }

  // shear reactions
  if (beam.leftSupport != SUPPORT.FREE) {
    if (beam.leftReactions.shear >= 0) {
      drawArrow(ctx, DEF_X-80, DEF_Y + 30, beam.leftReactions.shear, Math.PI, false, "blue");
    } else {
      drawArrow(ctx, DEF_X-80, DEF_Y + 70, beam.leftReactions.shear, Math.PI, false, "blue");
    }
  }
  if (beam.rightSupport != SUPPORT.FREE) {
    if (beam.rightReactions.shear >= 0) {
      drawArrow(ctx, DEF_X + beam.length * scale + 80, DEF_Y + 30, beam.rightReactions.shear, Math.PI, false, "blue");
    } else {
      drawArrow(ctx, DEF_X + beam.length * scale + 80, DEF_Y + 70, beam.rightReactions.shear, Math.PI, false, "blue");
    }
  }

  // tension reactions
  if (beam.leftSupport == SUPPORT.HINGED || beam.leftSupport == SUPPORT.FIXED) {
    if (beam.leftReactions.tension >= 0) {
      drawArrow(ctx, DEF_X - 60, DEF_Y, beam.leftReactions.tension, -Math.PI/2, false, "green");
    } else {
      drawArrow(ctx, DEF_X - 100, DEF_Y, beam.leftReactions.tension, -Math.PI/2, false, "green");
    }
  }
  if (beam.rightSupport == SUPPORT.HINGED || beam.rightSupport == SUPPORT.FIXED) {
    if (beam.rightReactions.tension >= 0) {
      drawArrow(ctx, DEF_X + 100 + beam.length * scale, DEF_Y, beam.rightReactions.tension, -Math.PI/2, false, "green");
    } else {
      drawArrow(ctx, DEF_X + 60 + beam.length * scale, DEF_Y, beam.rightReactions.tension, -Math.PI/2, false, "green");
    }
  }

  // moment reactions
  if (beam.leftSupport == SUPPORT.FIXED) {
    drawMomentArrow(ctx, DEF_X - 80, DEF_Y - 30, beam.leftReactions.moment, false, "red");
  }
  if (beam.rightSupport == SUPPORT.FIXED) {
    drawMomentArrow(ctx, DEF_X + 80 + beam.length * scale, DEF_Y - 30, -beam.rightReactions.moment, false, "red");
  }
}

//NAVIGATION FUNCTIONS
function startPan(e) {
	canv.addEventListener("mousemove", trackMouse);
	canv.addEventListener("mousemove", drawSystem);
	pan.start.x = e.clientX;
	pan.start.y = e.clientY;
}

function endPan(e) {
	canv.removeEventListener("mousemove", trackMouse);
	canv.removeEventListener("mousemove", drawSystem);
	pan.start.x = null;
	pan.start.y = null;
	global.offset.x = pan.offset.x;
	global.offset.y = pan.offset.y;
}

function trackMouse(e) {
	var offsetX  = e.clientX - pan.start.x;
	var offsetY  = e.clientY - pan.start.y;
	pan.offset.x = global.offset.x + offsetX;
	pan.offset.y = global.offset.y + offsetY;
}

function zoom(event) {
  let ZOOMING_SPEED = 0.04;
  event.preventDefault();
  scale += event.deltaY * -ZOOMING_SPEED;
  scale = Math.min(Math.max(.125, scale), 4);
}