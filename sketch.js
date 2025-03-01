"use strict"

const noiseLevel = 100; // Valeur maximale du noise
const noiseScale = 0.003; // Echelle du noise (sa puissance)
const vertexCount = 32;
const angle = 2* Math.PI/vertexCount;
const radius = 100;
let elements = [];

function setup() {
  createCanvas(800, 800);
  angleMode(RADIANS);

  for (let i = 0; i < vertexCount; i++) {
    let x = (cos(i * angle) * radius);
    let y = (sin(i * angle) * radius);

    elements.push({x, y});
  }
}

function draw() {
  let nt = noiseScale * frameCount;

  background(220);
  fill(255);
  noStroke();

  beginShape();
  for (let element of elements) {
    let pos = createVector(element.x, element.y);
    let nPos = (element.x + element.y) * noiseScale;
    let n = noiseLevel * noise(nPos, nt);
    
    

    if (pos.x < width / 2) {
      pos.add(-n, 0);
    } else if (pos.x > width / 2) {
      pos.add(n, 0);
    }
    if (pos.y < height / 2) {
      pos.add(0, -n);
    } else if (pos.y > height / 2) {
      pos.add(0, n);
    }


    if (pos.x == width / 2 && pos.y > height / 2) {
      pos.add(0, n);
    } else if (pos.x == width / 2 && pos.y < height / 2) {
      pos.add(0, -n);
    }

    if (pos.y == height / 2 && pos.x > width / 2) {
      pos.add(0, n);
    } else if (pos.y == height / 2 && pos.x < width / 2) {
      pos.add(0, -n);
    }
    
    
    vertex(pos.x + width / 2, pos.y + width / 2);
  }
  endShape(CLOSE);
}
