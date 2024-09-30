import {Component, inject, signal} from "@angular/core";
import {User} from "../models/user";
import {HttpClient} from "@angular/common/http";
import {AsyncPipe, JsonPipe} from "@angular/common";
import {toObservable} from "@angular/core/rxjs-interop";
import {shareReplay, switchMap} from "rxjs";

// Stati derivati
@Component({
  selector: "app-active-user",
  standalone: true,
  template: `
    @for (user of users(); track user.id) {
      <li
        (click)="onUserClick(user.id)"
        [class.active]="activeId() === user.id"
      >{{ user.name }}
      </li>
    }
    <hr>
    {{ activeUser$ | async | json }}
  `,
  imports: [
    JsonPipe,
    AsyncPipe
  ],
  styles: `
    .active {
      font-weight: bold;
      color: red;
    }
  `
})
export class ActiveUserComponent {

  private http = inject(HttpClient);

  users = signal<Pick<User, 'id' | 'name'>[]>([]);
  activeId = signal<User['id'] | null>(null);

  activeUser$ = toObservable(this.activeId).pipe(
    switchMap(id => {
      if (!id) return [null];
      return this.http.get<User>('https://jsonplaceholder.typicode.com/users/' + id);
    }),
    shareReplay(1)
  );

  ngOnInit() {
    this.http.get<User[]>('https://jsonplaceholder.typicode.com/users').subscribe(users => {
      const [u1, u2, u3] = users;
      this.users.set([u1, u2, u3].map(u => ({ id: u.id, name: u.name })));
    })
  }

  onUserClick(id: User['id']): void {
    if (id === this.activeId()) {
      this.activeId.set(null);
    } else {
      this.activeId.set(id);
    }
  }
}

