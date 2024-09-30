import {Component, inject, input} from "@angular/core";
import {User} from "../models/user";
import {HttpClient} from "@angular/common/http";
import {AsyncPipe, JsonPipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {switchMap, timer} from "rxjs";
import {toObservable} from "@angular/core/rxjs-interop";

@Component({
  selector: "app-user",
  standalone: true,
  imports: [
    JsonPipe,
    RouterLink,
    AsyncPipe
  ],
  template: `
    @if (user$ | async; as user) {
      <h3>User {{ user.id }}: {{ user.name }}</h3>
      <hr>
      {{ user | json }}
    }
    <hr>
    <button routerLink="/..">Back</button>
  `
})
export class UserComponent {

  private http = inject(HttpClient);

  id = input.required<string>();

  user$ = toObservable(this.id).pipe(
    switchMap(id => this.http.get<User>(
      'https://jsonplaceholder.typicode.com/users/' + id
    ))
  );
}

// mergeMap -> Fa tutte le chiamate in parallelo
// switchMap -> Annulla la precedente, fa la nuova
// concatMap -> Mette in coda
// exhaustMap -> Annulla la nuova, continua con la precedente
