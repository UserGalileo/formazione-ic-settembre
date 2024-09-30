import {Component, inject} from "@angular/core";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {WeatherService} from "../services/weather.service";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs";
import {AsyncPipe, JsonPipe} from "@angular/common";
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    JsonPipe
  ],
  template: `
    <form [formGroup]="form">
      <input type="text" formControlName="city" placeholder="Cerca città...">
      <button>invia</button>
    </form>

    @if (suggestions()) {
      Search:

      @for (city of suggestions(); track $index) {
        <li>{{ city }}</li>
      }
    }

  `
})
export class WeatherComponent {

  private weatherService = inject(WeatherService);

  form = new FormGroup({
    city: new FormControl('')
  });

  suggestions = toSignal(this.form.controls.city.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(city => this.weatherService.getSuggestions(city || ''))
  ), {
    initialValue: [],
  });
}
