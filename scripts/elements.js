// Beam
const leftSupportBox = document.getElementById('leftSupport');
const rightSupportBox = document.getElementById('rightSupport');
const lengthBox = document.getElementById('length');
// Load
const loadsListElement = document.getElementById('loads-list');
const addNewLoadButton = document.getElementById('add-new-load');
const loadTypeBox = document.getElementsByClassName('load-types');
const loadBox = document.getElementsByClassName('load-values');
const distanceBox = document.getElementsByClassName('load-distances');
const angleBox = document.getElementsByClassName('load-angles');
// Plots
const graphScaleBox = document.getElementById('graph_scale');
const shearsCheckbox = document.getElementById('graph_shears');
const tensionsCheckbox = document.getElementById('graph_tensions');
const momentsCheckbox = document.getElementById('graph_moments');
// Results
const leftReactionShearDiv = document.getElementById('leftReactionShear');
const rightReactionShearDiv = document.getElementById('rightReactionShear');
const leftReactionTensionDiv = document.getElementById('leftReactionTension');
const rightReactionTensionDiv = document.getElementById('rightReactionTension');
const leftReactionMomentDiv = document.getElementById('leftReactionMoment');
const rightReactionMomentDiv = document.getElementById('rightReactionMoment');
// Canvas
const canv = document.getElementById('vis');

const SUPPORT = {
  HINGED: 'hinged',
  FIXED: 'fixed',
  FREE: 'free',
  ROLLER: 'roller'
};

const LOAD_TYPES = {
  CONCENTRATED: 'concentratedLoad',
  MOMENT: 'moment',
  UNIFORM: 'uniformlyDistributed'
}

const MULTIPLIER = 100;
const PRECISION = 1000;
const DEF_X = window.innerWidth/2 - 100;
const DEF_Y = window.innerHeight/2;