import {Component, Input, output} from "@angular/core";

// Host Binding
// Host Listener
@Component({
  selector: "app-slider",
  standalone: true,
  template: `
    <input
      type="range"
      min="1"
      max="100"
      [disabled]="disabled"
      [value]="sliderValue"
      (input)="onInputChange($event)"
    >
    <p>Value: {{ sliderValue }}</p>
  `,
  styles: `
    :host {
      width: 100%;
    }

    input {
      -webkit-appearance: none;
      width: 100%;
      height: 15px;
      border-radius: 5px;
      background: #d3d3d3;
      outline: none;
      opacity: 0.7;
      -webkit-transition: .2s;
      transition: opacity .2s;
    }

    input:hover {
      opacity: 1;
    }

    input::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background: #04AA6D;
      cursor: pointer;
    }

    input::-moz-range-thumb {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background: #04AA6D;
      cursor: pointer;
    }
  `,
  host: {
    'role': 'slider', // attributo con stringa fissa
    '[attr.aria-valuenow]': 'sliderValue', // attributo variabile
    '[tabIndex]': 'disabled ? -1 : 0', // proprietà variabile
    '(mouseenter)': 'onMouseEnter($event)' // listener
  }
})
export class SliderComponent {

  @Input({ alias: 'value' }) sliderValue = 50;
  @Input() disabled = false;

  valueChange = output<number>();

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.sliderValue = +target.value;
    this.valueChange.emit(this.sliderValue);
  }

  onMouseEnter(event: Event) {
    console.log('Enter: ', event);
  }
}
