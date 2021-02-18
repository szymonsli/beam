let leftReaction = {
  shear: 0,
  tension: 0,
  moment: 0
}
let rightReaction = {
  shear: 0,
  tension: 0,
  moment: 0
};

function calculateShearAndMomentReactions(left, right, len, force, dist) {
  if ((left == SUPPORT.ROLLER && right == SUPPORT.HINGED) ||
      (left == SUPPORT.HINGED && right == SUPPORT.ROLLER) ||
      (left == SUPPORT.HINGED && right == SUPPORT.HINGED)) 
  {
    rightReaction.shear = parseFloat(force * dist / len);
    leftReaction.shear = parseFloat(force - rightReaction.shear);
    leftReaction.moment = 0;
    rightReaction.moment = 0;
  }

  else if (left == SUPPORT.FREE && right == SUPPORT.FIXED) 
  {
    rightReaction.shear = force;
    leftReaction.shear = 0;
    rightReaction.moment = - force * (len - dist) / MULTIPLIER;
    leftReaction.moment = 0;
  }

  else if (left == SUPPORT.FIXED && right == SUPPORT.FREE) 
  {
    rightReaction.shear = 0;
    leftReaction.shear = force;
    rightReaction.moment = 0;
    leftReaction.moment = - force * dist / MULTIPLIER;
  }

  else if (left == SUPPORT.FIXED && (right == SUPPORT.ROLLER || right == SUPPORT.HINGED))
  {
    rightReaction.shear = (force*dist)/(2*len*len*len)*(2*len*len - (len - dist)*len - (len - dist)*(len - dist));
    leftReaction.shear = (force*(len - dist))/(2*len*len*len)*(2*len*len + dist*len + dist*(len - dist));
    rightReaction.moment = 0;
    leftReaction.moment = - (force*dist*(len - dist))/(2*len*len)*(len+(len - dist)) / MULTIPLIER;
  }

  else if ((left == SUPPORT.ROLLER || left == SUPPORT.HINGED) && right == SUPPORT.FIXED)
  {
    rightReaction.shear = (force*dist)/(2*len*len*len)*(2*len*len + (len - dist)*len + dist*(len - dist));
    leftReaction.shear = (force*(len - dist))/(2*len*len*len)*(2*len*len - dist*len - dist*dist);
    rightReaction.moment = - (force*dist*(len - dist))/(2*len*len)*(len+dist) / MULTIPLIER;
    leftReaction.moment = 0;
  }

  else if (left == SUPPORT.FIXED && right == SUPPORT.FIXED)
  {
    rightReaction.shear = (force*dist)/(len*len*len)*(len*len + (len - dist)*dist - (len - dist)*(len - dist));
    leftReaction.shear = (force*(len - dist))/(len*len*len)*(len*len + dist*(len - dist) - dist*dist);
    rightReaction.moment = - force*dist*dist*(len-dist)/(len*len) / MULTIPLIER;
    leftReaction.moment = - force*dist*(len-dist)*(len-dist)/(len*len) / MULTIPLIER;
  }
};

function calculateTensionReactions(left, right, len, force, dist) {
  if ((left == SUPPORT.FREE || left == SUPPORT.ROLLER) && (right == SUPPORT.HINGED || right == SUPPORT.FIXED)) {
    leftReaction.tension = 0;
    rightReaction.tension = - force;
  } else if ((left == SUPPORT.HINGED || left == SUPPORT.FIXED) && (right == SUPPORT.FREE || right == SUPPORT.ROLLER)) {
    leftReaction.tension = - force;
    rightReaction.tension = 0;
  } else {
    rightReaction.tension = - dist * force / len;
    leftReaction.tension = - (force + rightReaction.tension);
  }
};