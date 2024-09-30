import {Component, inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {exhaustMap, startWith, Subject} from "rxjs";
import {toSignal} from "@angular/core/rxjs-interop";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-refresh-button',
  standalone: true,
  template: `
    <button (click)="refresh$.next()">refresh</button>
    <hr>
    {{ data() | json }}
  `,
  imports: [
    JsonPipe,
  ],
})
export class RefreshButtonComponent {
  private http = inject(HttpClient);

  refresh$ = new Subject<void>();

  data = toSignal(this.refresh$.pipe(
    startWith(null),
    exhaustMap(() => this.http.get('https://jsonplaceholder.typicode.com/users'))
  ));
}
