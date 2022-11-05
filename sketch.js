let vid;
// I'm denser than you!
// <!-- I'm a comment in HTML -->
let density = "N@W$9876543210?!abc;:+=-,._ ";
const len = density.length;
let asciiDiv;

function setup() {
  noCanvas();
  vid = createCapture(VIDEO);
  vid.size(48, 48);
  // Use asciiDiv as our canvas since we have no canvas rn
  asciiDiv = createDiv();
}

function draw() {
  vid.loadPixels();
  let asciiImage = "";
  // Goes through each row in the current frame's pixels
  for(let row = 0; row < vid.width; row++){
    for(let col = 0; col < vid.height; col++){
      const pixelIndex = (col + row * vid.width) * 4;
      const r = vid.pixels[pixelIndex];
      const g = vid.pixels[pixelIndex + 1];
      const b = vid.pixels[pixelIndex + 2];
      // "brightness" of our pixel
      const avg = (r + g + b) / 3;
      const charIndex = floor(map(avg, 0, 255, 0, len - 1));
      // Extract the character from charIndex
      const c = density.charAt(charIndex);
      
      if(c == " "){
        asciiImage += "&nbsp;"
      } else {
        asciiImage += c;
      }
    }
    // Go to the next line
    asciiImage += '<br/>';
  }
  // Add the string to our asciiDiv
  asciiDiv.html(asciiImage);
}