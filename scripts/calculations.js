function singleBeamVertical() {
  // createBeam();
  beam = new Beam();
  leftReactionShearDiv.innerHTML = '';
  rightReactionShearDiv.innerHTML = '';
  leftReactionTensionDiv.innerHTML = '';
  rightReactionTensionDiv.innerHTML = '';
  leftReactionMomentDiv.innerHTML = '';
  rightReactionMomentDiv.innerHTML = '';
  
  if ((beam.leftSupport == SUPPORT.FREE && beam.rightSupport == SUPPORT.ROLLER) ||
      (beam.leftSupport == SUPPORT.FREE && beam.rightSupport == SUPPORT.HINGED) ||
      (beam.leftSupport == SUPPORT.FREE && beam.rightSupport == SUPPORT.FREE) ||
      (beam.leftSupport == SUPPORT.ROLLER && beam.rightSupport == SUPPORT.FREE) ||
      (beam.leftSupport == SUPPORT.HINGED && beam.rightSupport == SUPPORT.FREE) ||
      (beam.leftSupport == SUPPORT.ROLLER && beam.rightSupport == SUPPORT.ROLLER)) 
  {
    ctx.clearRect(0, 0, canv.width, canv.height);
    return false;
  } 

  for (let i = 0; i < loadsList.length; i++) {
    loadsList[i].updateLoad(loadBox[i].value, distanceBox[i].value, angleBox[i].value, loadTypeBox[i].value)
    calculateShearAndMomentReactions(beam.leftSupport, beam.rightSupport, beam.length, loadsList[i].verticalLoad, loadsList[i].distance);
    calculateTensionReactions(beam.leftSupport, beam.rightSupport, beam.length, loadsList[i].horizontalLoad, loadsList[i].distance);
    beam.leftReactions.shear += leftReaction.shear;
    beam.rightReactions.shear += rightReaction.shear;
    beam.leftReactions.tension += leftReaction.tension;
    beam.rightReactions.tension += rightReaction.tension;
    beam.leftReactions.moment += leftReaction.moment;
    beam.rightReactions.moment += rightReaction.moment;

    calculateMoments(i, leftReaction);
    calculateShears(i, leftReaction);
    calculateTensions(i, leftReaction);
  }
  
  // UPDATE BEAM
  leftReactionShearDiv.innerHTML = `Left shear reaction = ${Math.round(beam.leftReactions.shear*1000)/1000} kN`;
  rightReactionShearDiv.innerHTML = `Right shear reaction = ${Math.round(beam.rightReactions.shear*1000)/1000} kN`;
  leftReactionTensionDiv.innerHTML = `Left tension reaction = ${Math.round(beam.leftReactions.tension*1000)/1000} kN`;
  rightReactionTensionDiv.innerHTML = `Right tension reaction = ${Math.round(beam.rightReactions.tension*1000)/1000} kN`;
  leftReactionMomentDiv.innerHTML = `Left moment reaction = ${Math.round(beam.leftReactions.moment*1000)/1000} kNm`;
  rightReactionMomentDiv.innerHTML = `Right moment reaction = ${Math.round(beam.rightReactions.moment*1000)/1000} kNm`;
  

  console.log(beam);
  return true;
}


function calculateMoments(forceIndex, left) {
  for (let i = 0; i <= PRECISION; i++) {
    let dist = beam.steps[i];
    if (dist <= loadsList[forceIndex].distance) {
      beam.moments[i] += (left.shear * dist / MULTIPLIER);
    } else {
      beam.moments[i] += ((left.shear * dist - loadsList[forceIndex].verticalLoad * (dist - loadsList[forceIndex].distance)) / MULTIPLIER);
    }
  }
}

function calculateShears(forceIndex, left) {
  for (let i = 0; i <= PRECISION; i++) {
    let dist = beam.steps[i];
    if (dist <= loadsList[forceIndex].distance) {
      beam.shears[i] += left.shear;
    } else {
      beam.shears[i] += left.shear - loadsList[forceIndex].verticalLoad; 
    }
  }
}

function calculateTensions(forceIndex, left) {
  for (let i = 0; i <= PRECISION; i++) {
    let dist = beam.steps[i];
    if (dist <= loadsList[forceIndex].distance) {
      beam.tensions[i] += (-left.tension);
    } else {
      beam.tensions[i] += - (left.tension + loadsList[forceIndex].horizontalLoad); 
    }
  }
}

function doEverything() {
  let beamIsCorrect = singleBeamVertical();
  if (beamIsCorrect) {
    drawSystem();
  }
}
