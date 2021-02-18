// BEAM
lengthBox.addEventListener("change", () => {
  const lengthValue = lengthBox.value;
  if ((lengthValue == '') || (parseFloat(lengthValue) < 0)) {
    lengthBox.value = 1;
    for (let i = 0; i < loadsList.length; i++) {
      distanceBox[i].max = 1;
      distanceBox[i].value = 1;
    }
  } else {
    for (let i = 0; i < loadsList.length; i++) {
      distanceBox[i].max = lengthValue;
      if (parseFloat(distanceBox[i].value) > parseFloat(lengthValue)) {
        distanceBox[i].value = lengthValue;
      }
    }
  }
  
  doEverything();
});

leftSupportBox.addEventListener("change", doEverything);

rightSupportBox.addEventListener("change", doEverything);

// PLOTS
shearsCheckbox.addEventListener("change", doEverything);

tensionsCheckbox.addEventListener("change", doEverything);

momentsCheckbox.addEventListener("change", doEverything);

graphScaleBox.addEventListener("change", () => {
  if ((graphScaleBox.value == '') || (graphScaleBox.value < 0)) {
    graphScaleBox.value = 0.1;
  }
  doEverything();
});

// for (let i = 0; i < forces.length; i++) {
//   distanceBox[i].addEventListener("change", () => {
//     const lengthValue = parseFloat(lengthBox[i].value);
//     const distanceValue = parseFloat(distanceBox[i].value);
//     if (distanceValue > lengthValue) {
//       distanceBox[i].value = lengthValue;
//     } else if ((distanceValue < 0) || (distanceValue == '')) {
//       distanceBox[i].value = 0;
//     }
//     doEverything();
//   });
  
//   loadBox[i].addEventListener("change", () => {
//     if (loadBox[i].value == ''){
//       loadBox[i].value = 0;
//     }
//     doEverything();
//   });
  
//   angleBox[i].addEventListener("change", () => {
//     if ((angleBox[i].value == '') || (angleBox[i].value < 0)) {
//       angleBox[i].value = 0;
//     } else if (angleBox[i].value > 180) {
//       angleBox[i].value = 180;
//     }
//     doEverything();
//   });
// }

addNewLoadButton.addEventListener("click", () => {
  addNewLoad();
  doEverything();
});

// WINDOW
window.addEventListener("resize", () => {
  canv.width = window.innerWidth;
  canv.height = window.innerHeight;
  doEverything();
});

window.addEventListener("load", () => {
  canv.width = window.innerWidth;
  canv.height = window.innerHeight;
  doEverything();
});

// CANVAS
canv.addEventListener("wheel", zoom);
canv.addEventListener("wheel", doEverything);
canv.addEventListener("mousedown", startPan);
canv.addEventListener("mouseleave", endPan);
canv.addEventListener("mouseup", endPan);

function updateLoadValue(index) {
  if (loadBox[index].value == ''){
    loadBox[index].value = 0;
  }
  doEverything();
}

function updateLoadDistance(index) {
  const lengthValue = parseFloat(lengthBox.value);
  const distanceValue = parseFloat(distanceBox[index].value);
  if (distanceValue > lengthValue) {
    distanceBox[index].value = lengthValue;
  } else if ((distanceValue < 0) || (distanceValue == '')) {
    distanceBox[index].value = 0;
  }
  doEverything();
}

function updateLoadAngle(index) {
  if ((angleBox[index].value == '') || (angleBox[index].value < 0)) {
    angleBox[index].value = 0;
  } else if (angleBox[index].value > 180) {
    angleBox[index].value = 180;
  }
  doEverything();
}