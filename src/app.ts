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

    const brightnessSlider = this.getBrightnessSlider();
    if (brightnessSlider) {
      brightnessSlider.addEventListener('input', event => {
        const value = parseFloat(event.srcElement.value);
        console.log('value:', value);
      });
    }
  }

  generateLEDs() {
    for (let i = 0; i < this.ROWS; i += 1) {
      let row: paper.Path.Rectangle[] = [];
      for (let j = 0; j < this.COLS; j += 1) {
        const index = i * this.COLS + j;
        const size = new paper.Size(this.LED_SIZE, this.LED_SIZE);
        const initialColor = new paper.Color(j * this.STEP, 0, 0);
        const point = new paper.Point(j * this.LED_SIZE, i * this.LED_SIZE);
        row.push(this.generateLED(index, size, initialColor, point));
      }
      this.leds.push(row);
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
