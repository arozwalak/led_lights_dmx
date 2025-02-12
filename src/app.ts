// entire file content ...
import * as paper from 'paper';
import { of, delay, map, timer, Subscription } from 'rxjs';


const ROWS = 20;
const COLS = 30;
const LED_SIZE = 25;
const STEP = 1 / COLS;

const RED = new paper.Color(1, 0, 0);
const GREEN = new paper.Color(0, 1, 0);
const BLUE = new paper.Color(0, 0, 1);
const RGB = [RED, GREEN, BLUE];


export class App {
  leds: paper.Path.Rectangle[] = [];
  brightness = 0;
  originalColor: any;
  timer!: Subscription;
  currentColor = 0;

  redSlider: HTMLInputElement | null = null;
  greenSlider: HTMLInputElement | null = null;
  blueSlider: HTMLInputElement | null = null;
  brightnessSlider: HTMLInputElement | null = null;
  hueSlider: HTMLInputElement | null = null;
  startBtn: HTMLButtonElement | null = null;
  stopBtn: HTMLButtonElement | null = null;
  delayInput: HTMLInputElement | null = null;
  intervalInput: HTMLInputElement | null = null;

  init() {
    console.log('initialising...');
    const panel: any = document.querySelector('#panel');
    paper.setup(panel);

    this.getElements();
    this.generateLEDs();
    this.setupSliders();
    this.registerEventHandlers();
  }


  getElements() {
    this.redSlider = this.getElementById<HTMLInputElement>('redSlider');
    this.greenSlider = this.getElementById<HTMLInputElement>('greenSlider');
    this.blueSlider = this.getElementById<HTMLInputElement>('blueSlider');
    this.brightnessSlider = this.getElementById<HTMLInputElement>('brightnessSlider');
    this.hueSlider = this.getElementById<HTMLInputElement>('hueSlider');
    this.startBtn = this.getElementById<HTMLButtonElement>('startBtn');
    this.stopBtn = this.getElementById<HTMLButtonElement>('stopBtn');
    this.delayInput = this.getElementById<HTMLInputElement>('delayInput');
    this.intervalInput = this.getElementById<HTMLInputElement>('intervalInput');
  }

  registerEventHandlers() {
    if (this.stopBtn) {
      this.stopBtn.addEventListener('click', () => this.stop());
    }

    if (this.startBtn) {
      this.startBtn.addEventListener('click', () => this.start());
    }
  }

  start() {
    console.log('started...');
    let delay = 0;
    let interval = 0;

    if (this.delayInput) {
      delay = Number(this.delayInput.value) || 0;
    }

    if (this.intervalInput) {
      interval = Number(this.intervalInput.value) || 0;
    }

    if (delay >= 0 && interval >= 0) {
      this.timer = timer(delay, interval).subscribe((el) => {
        this.columnAnimation(el % COLS);
      });

      if (this.startBtn) {
        this.startBtn.disabled = true;
      }
    }
  }

  stop() {
    if (this.timer) {
      console.log('stopped...');
      this.timer.unsubscribe();
      if (this.startBtn) {
        this.startBtn.disabled = false;
      }
    }
  }


  private columnAnimation(column: number) {
    let col = this.getColumn(column);
    col.forEach((led) => led.fillColor = RGB[this.currentColor]);
    if (column === COLS - 1) {
      if (this.currentColor > 2) {
        this.currentColor = 0;
      } else {
        this.currentColor++;
      }
    }
  }


  private getColumn(col: number) {
    let colArr = [];
    for (let row = 0; row < ROWS; row += 1) {
      colArr.push(this.leds[col + COLS * row])
    }
    return colArr;
  }

  private setupSliders() {
    if (this.brightnessSlider) {
      this.brightnessSlider.addEventListener('input', (event: any) => {
        // const brightness = parseFloat(event.srcElement.value) / 100;
        // for (let i = 0; i < this.leds.length; i += 1) {
        //   const led: any = this.leds[i];
        //   const red =   led.origColor[0] * brightness;
        //   const green = led.origColor[1] * brightness;
        //   const blue =  led.origColor[2] * brightness;
        //   this.changeColorTo(this.leds[i], new paper.Color(red, green, blue));
        // }
      });
    }

    if (this.redSlider) {
      this.redSlider.addEventListener('input', (event: any) => {
        this.updateSingleColor('red', event.srcElement.value);
      });
    }

    if (this.greenSlider) {
      this.greenSlider.addEventListener('input', (event: any) => {
        this.updateSingleColor('green', event.srcElement.value);
      });
    }

    if (this.blueSlider) {
      this.blueSlider.addEventListener('input', (event: any) => {
        this.updateSingleColor('blue', event.srcElement.value);
      });
    }
  }

  private generateLEDs() {
    this.leds = [];

    for (let i = 0; i < ROWS; i += 1) {
      for (let j = 0; j < COLS; j += 1) {
        const size = new paper.Size(LED_SIZE, LED_SIZE);
        const initialColor = new paper.Color(0, 0, 0);
        const point = new paper.Point(j * LED_SIZE, i * LED_SIZE);
        this.leds.push(this.generateLED(size, initialColor, point));
      }
    }
  }

  private generateLED(size: paper.Size, initialColor: paper.Color, point: paper.Point) {
    const ledElement = new paper.Path.Rectangle(point, size);
    ledElement.fillColor = initialColor;
    ledElement.strokeColor = new paper.Color(0, 0, 0);
    return ledElement;
  }
  
  private getElementById<T>(id: string) {
    return document.getElementById(id) as T;
  }

  private changeColorTo(led: paper.Path.Rectangle, color: paper.Color) {
    led.fillColor = color;
  }


  private updateSingleColor(color: string, value: any) {
    let red, green, blue;
    
    for (let i = 0; i < this.leds.length; i += 1) {
      const led = this.leds[i];

      switch(color) {
        case 'red':
          red = parseFloat(value) / 100;
          green = led.style.fillColor?.green;
          blue = led.style.fillColor!.blue;
          break;
        case 'green':
          red = led.style.fillColor?.red;
          green = parseFloat(value) / 100;
          blue = led.style.fillColor!.blue;
          break;
        case 'blue':
          red = led.style.fillColor?.red;
          green = led.style.fillColor!.green;
          blue = parseFloat(value) / 100;
          break;
        default:
          throw new Error('wrong color, should be one of "red", "green", "blue"');
      }


      if (red !== undefined && green !== undefined && blue !== undefined) {
        this.changeColorTo(this.leds[i], new paper.Color(red, green, blue));
      }
    }
  }
}
