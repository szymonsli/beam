let beam;

let forces = [];

function createBeam() {
  beam = {
    leftSupport: leftSupportBox.value,
    rightSupport: rightSupportBox.value,
    length: parseFloat(lengthBox.value),
    leftReactions: {
      shear: 0,
      tension: 0,
      moment: 0
    },
    rightReactions: {
      shear: 0,
      tension: 0,
      moment: 0
    },
    steps: [],
    shears: [],
    tensions: [],
    moments: []
  }

  for (let i = 0; i <= PRECISION; i++) {
    beam.steps[i] = beam.length/PRECISION * i;
    beam.shears[i] = 0;
    beam.tensions[i] = 0;
    beam.moments[i] = 0;
  }
}

class Load {
  constructor(value, distance, angle, loadType) {
    this.id = loadsListElement.children.length - 1;
    this.force = parseFloat(value);
    this.distance = parseFloat(distance);
    this.angle = parseFloat(angle * Math.PI / 180);
    this.loadType = loadType;
    this.verticalForce = this.force * Math.sin(this.angle);
    this.horizontalForce = this.force * Math.cos(this.angle);
  }

  updateLoad(value, distance, angle, loadType) {
    this.id = loadsListElement.children.length - 1;
    this.force = parseFloat(value);
    this.distance = parseFloat(distance);
    this.angle = parseFloat(angle * Math.PI / 180);
    this.loadType = loadType;
    this.verticalForce = this.force * Math.sin(this.angle);
    this.horizontalForce = this.force * Math.cos(this.angle);
  }
}

function addNewLoad() {
  console.log(forces)
  forces[loadsListElement.children.length - 1] = new Load(10, 10, 90, 'concentratedLoad');
  console.log(forces)
  let id = loadsListElement.children.length - 1;
  
  let loadId = `<div>${id}.</div>`;
  let loadType = 
    `<div>
    <select class="load-types" name="loadType${id}" id="loadType${id}">
      <option value="concentratedLoad">Concentrated load</option>
      <option value="moment">Moment</option>
      <option value="fixed">Uniformly distributed</option>
    </select>
  </div>`;
  let loadValue = `<div><input type="number" class="load-values" onchange="updateLoadValue('${id}')" name="load${id}" id="load${id}" value="0" /></div>`;
  let loadDistance = `<div><input type="number" class="load-distances" onchange="updateLoadDistance('${id}')" name="distance${id}" id="distance${id}" value="0" min="0" step="1" /></div>`;
  let loadAngle = `<div><input type="number" class="load-angles" onchange="updateLoadAngle('${id}')" name="angle${id}" id="angle${id}" value="90" min="0" max="180" step="1" /></div>`;
  let loadDeleteIcon = `<div id="delete${id}">X</div>`

  let listItem = `<li class="loadSettings">${loadId}${loadType}${loadValue}${loadDistance}${loadAngle}${loadDeleteIcon}</li>`;
  
  // loadsListElement.appendChild(listItem);
  loadsListElement.innerHTML += listItem;
}

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



