  // images
  let bg;
  let brush = [];

  // bursh mechanics
  let angle1, segLength;
  let scalar = 30;
  let tempwinMouseX = 0;
  let tempwinMouseY = 0;
  let tempX = 100;
  let tempY = 100;
  let dx;
  let dy;


  // VARIABLES FOR TIME DELAY ON BRUSH
  let milliCounter;
  let milliTrack = 0;

  //BRUSH CHARACTERISTICS
  let milliComp = 10;
  let scatterAmount = 2;


  // COLOUR VARAIABLES
  let colHue;
  const colHueMin = 0;
  const colHueMax = 360;

  let colSat;
  const colSatMin = 0;
  const colSatMax = 255;

  let colBri;
  const colBriMin = 0;
  const colBriMax = 255;

  let colOpacity = 0.4;

  let colourBool = 0;

  // Saved colours as discussed with Emma - see mood board


  let cloudHSB = [
    [180, 47, 25],
    [178, 23, 55],
    [170, 15, 75],
    [164, 12, 95],
    [176, 45, 19]
  ];

  let sunsetHSB = [
    [11, 53, 96],
    [13, 83, 91],
    [2, 90, 100],
    [334, 81, 91],
    [300, 67, 99]
  ];

  const hueDrift = 3;
  const satDrift = 3;
  const rotateDrift = 0.2;


  // STATE SWITCH
  let bool = 1;
  let brushTemp = 0;

  // BUTTON TEXT
  let buttonText1state = 0;
  let buttonText2state = 0;

  let button1A, button1B, button2A, button2B, button3;

  var col;
  var colSelect;



  //button spacing
  //margin from right

  function preload() {
    bg = loadImage('assets/paper.jpg'); // background paper
    for (i = 1; i < 21; i++) {
      brush[i] = loadImage('assets/br-' + i + '.png') // brush loader
    }
  }

  function setup() {
createCanvas(windowWidth, windowHeight);

    pixelDensity(1); // Ignores retina displays

    imageMode(CENTER); // centers loaded brushes
    blendMode(BLEND); // consider overlay and multiply
    colorMode(HSB, 360, 100, 100, 1)
    colHue = random(colHueMin, colHueMax);
    colSat = random(colSatMin, colSatMax);


  backdrop();

    segLength = windowWidth / 40; // length of delay between touch and paint or line // 15 is a good value

    strokeWeight(4); // for line work
    stroke(255, 0, 255); // for line work

    writeTextUI();
  }

  function backdrop(){
      noTint();
      image(bg, windowWidth / 2, windowHeight / 2, windowWidth, windowHeight); // display backgrond
  }

  function invertTracing() {
    bool = !bool; // temporary invert function, will be overidden by UI

    if (bool) {
      button2A.style('background-color', colSelect);
      button2B.style('background-color', col);
    }
    else {
      button2A.style('background-color', col);
      button2B.style('background-color', colSelect);

    }
  }

  function writeTextUI(){

    textSize(windowWidth/50);
    fill(0);
    noStroke();

    let vw = windowWidth/100; // suspect we may have issue here with IOS in terms of rotation and measuring height, etc
    let textMargin = windowWidth/100; // consolidate into above - no point having 2

    button1A = createButton('Sunset Colours');
    button1B = createButton('Sea Colours');
    button2A = createButton('Paint');
    button2B = createButton('Trace');
    button3 = createButton('Restart');
    button1A.position(textMargin,textMargin);
    button1B.position((vw*15)+textMargin,textMargin); // 16 because 16 characters in 'Sunset Colours'
    button2A.position(textMargin,textMargin*4);
    button2B.position(vw*12.5+textMargin,textMargin*4); // 7 because 7 characters in Paint
    button3.position(textMargin,textMargin*7.5);

   col = color(0,0,0,0.2);
   colSelect = color(0,0,0,0.7);
  colH3 = color(360,100,100,0.6);

   button1A.style('background-color', colSelect)
   button1A.style('font-size', '1.5vw');
   button1A.style('color', 'white');
   button1A.style('width', '15vw');5
   button1A.mousePressed(invertColourSet);

   button1B.style('background-color', col)
   button1B.style('font-size', '1.5vw');
   button1B.style('color', 'white');
   button1B.style('width', '15vw');
   button1B.mousePressed(invertColourSet);

   button2A.style('background-color', colSelect)
   button2A.style('font-size', '2vw');
   button2A.style('color', 'white');
   button2A.mousePressed(invertTracing);
  // button2A.style('border-radius', '1vw')
   button2A.style('width', '12.5vw');

   button2B.style('background-color', col)
   button2B.style('font-size', '2vw');
   button2B.style('color', 'white');
   //button2B.style('border-radius', '1vw')
   button2B.style('width', '12.5vw');
   button2B.mousePressed(invertTracing);

   button3.style('background-color', colH3);
   button3.style('font-size', '1.25vw');
   button3.style('color', 'white');
   button3.style('border-radius', '2vw')
   button3.mousePressed(reset);
   button3.style('width', '8vw');

if (deviceOrientation === LANDSCAPE || deviceOrientation === 'undefined'){

}

else {

}

  }


function invertColourSet() {

  colourBool = !colourBool;

  if (colourBool) {
    button1A.style('background-color', col);
    button1B.style('background-color', colSelect);
  }
  else {
    button1A.style('background-color', colSelect);
    button1B.style('background-color', col);
  }


}

  function mousePressed() {

    tempwinMouseX = ((windowWidth / 2) - winMouseX); // record position on downpress
    tempwinMouseY = ((windowHeight / 2) - winMouseY); // record position on downpress
    brushTemp = int(random(1, 20));
    tint(255, 0.01); // Display at half opacit

    if (bool) {
      image(bg, windowWidth / 2, windowHeight / 2, windowWidth, windowHeight);
      let swatchTemp = int(random(0,5));
      //console.log(swatchTemp);

      if (colourBool) {
        colHue = cloudHSB[swatchTemp][0];
        colSat = cloudHSB[swatchTemp][1];
        colBri = cloudHSB[swatchTemp][2];
      }
      else  {
        colHue = sunsetHSB[swatchTemp][0];
        colSat = sunsetHSB[swatchTemp][1];
        colBri = sunsetHSB[swatchTemp][2];
      }

    }
  }


  function touchMoved() {


    milliCounter = millis();

    if (bool) {

      if (milliCounter > milliTrack + milliComp) {
        tint((colHue += random(-hueDrift, hueDrift)), (colSat += random(-satDrift, satDrift)), colBri, colOpacity); // Display at half opacity

        if (colSat < 10) {
          colSat += 30
        }

        console.log('Hue = '+colHue);
        console.log('Saturation = '+colSat);
        console.log('Brightness = '+colBri);

        dx = winMouseX - tempX;
        dy = winMouseY - tempY;

        angle1 = atan2(dy, dx) + (random(-rotateDrift, rotateDrift)); // https://p5js.org/reference/#/p5/atan2
        tempX = winMouseX - (cos(angle1) * segLength/2); // https://p5js.org/examples/interaction-follow-1.html
        tempY = winMouseY - (sin(angle1) * segLength/2);
        scalar = constrain(100*(random(3,abs(winMouseX - pwinMouseX))/windowWidth),0,1.5);


        segment(tempX, tempY, angle1, brush[brushTemp], scalar)

        milliTrack = milliCounter;
      }
    } else {
      strokeWeight(constrain(abs((winMouseY+winMouseX)-(pwinMouseX+pwinMouseY)),0.3,0.8)); // for line work
      stroke(255, 0, 255); // for line work
      line(winMouseX, winMouseY, pwinMouseX, pwinMouseY);
    }
  }

  function segment(rakeX, rakeY, a, rake, scalar) {
    push();

    translate(rakeX + (randomGaussian(-scatterAmount*(0.1*scalar), scatterAmount*(0.1*scalar))), rakeY + (randomGaussian(-scatterAmount*(0.1*scalar), scatterAmount*(0.1*scalar))));
//translate(rakeX, rakeY);
    rotate(a);
    scale(scalar);

    image(rake, 0, 0, 0, 0);
    pop();
  }

  function reset() {
    backdrop();
    if (!bool)
   invertTracing();
  }


  function windowResized() {
    setup(); // need to rewrite this to ensure image is saved
  }
