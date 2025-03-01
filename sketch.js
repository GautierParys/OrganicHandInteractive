"use strict"
const noiseLevel = 100; // Veleur maximale du noise
const noiseScale = 0.005; // Echelle du noise (sa puissance)
const vertexCount = 16;
const angle = 2* Math.PI/vertexCount;
const radius = 100;
let elements = [];

function setup() {
  createCanvas(800, 800);
  angleMode(RADIANS);

  for (let i = 0; i < vertexCount; i++) {
    let x = (cos(i * angle) * radius) - radius / 2;
    let y = (sin(i * angle) * radius) - radius / 2;

    elements.push({x, y});

    console.log(elements[i].x);
    console.log(elements[i].y);
  }
}

function draw() {
  let nt = noiseScale * frameCount;

  background(220);
  fill(255);
  noStroke();
  translate(width / 2, height / 2);

  beginShape();
  for (let element of elements) {
    let pos = createVector(element.x, element.y);
    let nPos = (element.x + element.y) * noiseScale;
    let n = noiseLevel * (noise(nPos * nt) + 0.2);
    
    pos.add(n, n);
    
    vertex(pos.x, pos.y);
  }
  endShape(CLOSE);
}
