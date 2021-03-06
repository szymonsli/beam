let loadsList = [];

class Load {
  constructor(value, distance, angle, loadType) {
    this.id = loadsListElement.children.length - 1;
    this.loadValue = parseFloat(value);
    this.distance = parseFloat(distance);
    this.angle = parseFloat(angle * Math.PI / 180);
    this.loadType = loadType;
    this.verticalLoad = this.loadValue * Math.sin(this.angle);
    this.horizontalLoad = this.loadValue * Math.cos(this.angle);
  }

  updateLoad(value, distance, angle, loadType) {
    this.id = loadsListElement.children.length - 1;
    this.loadValue = parseFloat(value);
    this.distance = parseFloat(distance);
    this.angle = parseFloat(angle * Math.PI / 180);
    this.loadType = loadType;
    this.verticalLoad = this.loadValue * Math.sin(this.angle);
    this.horizontalLoad = this.loadValue * Math.cos(this.angle);
  }
}

function addNewLoad() {
  let id = loadsListElement.children.length - 1;
  // let id = Date.now() - 1613323023105;

  loadsList[id] = new Load(0, 0, 90, 'concentratedLoad');
  
  let loadId = `<div>${id+1}.</div>`;
  let loadType = 
    `<div>
    <select class="load-types" name="loadType${id}" id="loadType${id}" value="${loadsList[id].loadType}">
      <option value="concentratedLoad">Concentrated load</option>
      <option value="moment">Moment</option>
      <option value="uniformlyDistributed">Uniformly distributed</option>
    </select>
  </div>`;
  let loadValue = `<div><input type="number" class="load-values" onchange="updateLoadValue('${id}')" name="load${id}" id="load${id}" value="${loadsList[id].loadValue}" /></div>`;
  let loadDistance = `<div><input type="number" class="load-distances" onchange="updateLoadDistance('${id}')" name="distance${id}" id="distance${id}" value="${loadsList[id].distance}" min="0" step="1" /></div>`;
  let loadAngle = `<div><input type="number" class="load-angles" onchange="updateLoadAngle('${id}')" name="angle${id}" id="angle${id}" value="${loadsList[id].angle*180/Math.PI}" min="0" max="180" step="1" /></div>`;
  let loadDeleteIcon = `<div id="delete${id}"><i class="icon-trash-empty"></i></div>`

  let listItem = `<li class="loadSettings">${loadId}${loadType}${loadValue}${loadDistance}${loadAngle}${loadDeleteIcon}</li>`;
  
  loadsListElement.insertAdjacentHTML('beforeend', listItem);
}
