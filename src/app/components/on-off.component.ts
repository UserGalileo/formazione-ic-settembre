import {Component} from "@angular/core";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {interval, startWith, switchMap} from "rxjs";

@Component({
  selector: 'app-on-off',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  template: `
    Realtime:
    <select [formControl]="state">
      <option value="on">on</option>
      <option value="off">off</option>
    </select>
  `
})
export class OnOffComponent {
  state = new FormControl<'on' | 'off'>('off', { nonNullable: true });

  data$ = interval(1000);

  ngOnInit() {
    this.state.valueChanges.pipe(
      startWith(this.state.value),
      switchMap(state => state === 'on' ? this.data$ : [])
    ).subscribe(console.log)
  }
}
