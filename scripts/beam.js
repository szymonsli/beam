let beam;

class Beam {
  constructor() {
    this.leftSupport = leftSupportBox.value;
    this.rightSupport = rightSupportBox.value;
    this.length = parseFloat(lengthBox.value);
    this.leftReactions = {
      shear: 0,
      tension: 0,
      moment: 0
    };
    this.rightReactions = {
      shear: 0,
      tension: 0,
      moment: 0
    };
    this.steps = [];
    this.shears = [];
    this.tensions = [];
    this.moments = [];

    for (let i = 0; i <= PRECISION; i++) {
      this.steps[i] = this.length/PRECISION * i;
      this.shears[i] = 0;
      this.tensions[i] = 0;
      this.moments[i] = 0;
    }
  }
}

