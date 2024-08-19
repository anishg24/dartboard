// Dartboard code modified from https://editor.p5js.org/Gholamrezadar/sketches/dZpMEKDy_

const W = 650;
const H = W*1.25;
const SCREEN_PADDING = W * 0.1;

// Calculate Radii
const R = W-SCREEN_PADDING;
const MULTIPLIER_WIDTH = 16/451;
let radii = [1, 0.753, 0.753-MULTIPLIER_WIDTH, 0.474, 0.474-MULTIPLIER_WIDTH, 0.0709, 0.0281]
radii = radii.map((x)=>R*x);

// Numbers in order
const numbers = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5];

// Dots
const dot_w = W*0.02;

// Score
let score = 0;
let darts = new Darts(3);
let dart = new Dart();

// Dartboard
let dartboard = new Dartboard();

function cart2Polar(x,y) {
    // Calculate radius (distance from origin)
    const radius = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

    // Calculate angle
    const angle = Math.atan2(y, x);

    return [ radius, angle ];
}

// TODO: Rework this for our use case
function getThrowScore(x, y) {
    let multiplier = 1;
    let score = 0;

    let [r, theta] = cart2Polar(x, y);
    theta += PI // 0 -> 2pi

    // Out of Bounds
    if(r>radii[0]/2) {
        return 0;
    }

    // Double Bulls-eye
    if(r<radii[radii.length-1]/2){
        return [25, 2];
    }

    // Single Bulls-eye
    if(r<radii[radii.length-2]/2) {
        return [25, 1];
    }

    // Inner Ring
    if(r<radii[radii.length-4]/2 && r>radii[radii.length-3]/2) {
        multiplier = 3;
    }

    // Outer Ring
    if(r<radii[1]/2 && r>radii[2]/2) {
        multiplier = 2;
    }

    // find score based on angle
    let slice = 2*PI/20;

    let idx = Math.floor((theta+(slice/2))/slice);

    let numbers_rotated = [11, 14, 9, 12, 5, 20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8];
    score = numbers_rotated[idx%20];

    return [score, multiplier];
}

function drawCursor() {
    fill("rgba(71,163,243,0.7)");
    circle(mouseX-width/2, mouseY-width/2, dot_w);
}

function setup() {
    createCanvas(W, H);
}

function draw() {
    background(28);
    noStroke();

    // Draw Dart Board
    push();
    translate(width/2, width/2);
    dartboard.draw();
    pop();

    // Draw Cursor
    push();
    translate(width/2, width/2);
    drawCursor();
    pop();

    // Draw Dart Shots
    darts.draw()

    // UI
    push();
    translate(width/2, height*0.87);
    fill(255);
    textSize(W*0.06);
    textAlign(CENTER, CENTER);
    text(`Total Leftover = ${Module._get_score()}`,0,0);
    pop();
}

function mouseClicked() {
    const value = getThrowScore(mouseX-width/2, mouseY-width/2);
    console.log(value);
    darts.shoot(mouseX, mouseY, value[0], value[1]);
}