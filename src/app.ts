// entire file content ...
import * as paper from 'paper';

export class App {
  ROWS = 10;
  COLS = 15;
  LED_SIZE = 50;
  STEP = 1 / this.COLS;
  leds: paper.Path.Rectangle[] = [];

  RED = new paper.Color(1, 0, 0);
  GREEN = new paper.Color(0, 1, 0);
  BLUE = new paper.Color(0, 0, 1);

  constructor() {
    console.log("created App");
  }

  init() {
    const panel: any = document.querySelector('#panel');
    paper.setup(panel);

    this.leds = [];
    this.generateLEDs();
    console.log(this.leds);

    const brightness = this.getBrightnessSlider();
    if (brightness) {
      brightness.addEventListener('input', event => {
          console.log('value', event.srcElement.value);
      })
    }
    

    let x = 0;
    // setInterval(() => {
    //   let direction = -1;
    //   for (let x = 0; x < this.leds.length; x += 1) {
    //     const led = this.leds[x];
    //     // Get the current color and brightness of the LED
    //     let currentColor = led.fillColor;
    //     if (currentColor) {
    //       let currentBrightness = currentColor.red;
        
    //     // Update the brightness for the next frame
    //     if (currentBrightness + this.STEP / 2 > 1 ||
    //       currentBrightness - this.STEP / 2 < 0
    //     ) {
    //       direction = -direction;
    //     }
    //     currentBrightness = currentBrightness + direction * (this.STEP / 2);
        
    //     console.log(currentBrightness);
        
    //     // Update the color of the LED with the new brightness
    //     led.fillColor = new paper.Color(currentBrightness, 0, 0);
    //     }
    //   }
    // }, 1000);
  }

  generateLEDs() {
    for (let i = 0; i < this.ROWS; i += 1) {
      let row: paper.Path.Rectangle[] = [];
      for (let j = 0; j < this.COLS; j += 1) {
        const index = i * this.COLS + j;
        const size = new paper.Size(this.LED_SIZE, this.LED_SIZE);
        const initialColor = new paper.Color(j * this.STEP, 0, 0);
        const point = new paper.Point(j * this.LED_SIZE, i * this.LED_SIZE);
        this.leds.push(this.generateLED(index, size, initialColor, point));
      }
    }
  }

  changeColorTo(led: paper.Path.Rectangle, color: paper.Color) {
    led.fillColor = color;
  }

  generateLED(i: number, size: paper.Size, initialColor: paper.Color, point: paper.Point) {
    const ledElement = new paper.Path.Rectangle(point, size);
    ledElement.fillColor = initialColor;
    return ledElement;
  }

  getBrightnessSlider() {
    return document.getElementById('brightness');
  }
}
