import {Component, inject} from "@angular/core";
import {User} from "../models/user";
import {HttpClient} from "@angular/common/http";
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: "app-users",
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet
  ],
  template: `
    <h3>Users:</h3>
    @for (user of users; track user.id) {
      <li><a [routerLink]="'/users/' + user.id">{{ user.name }}</a></li>
    } @empty {
      No users.
    }
    <hr>
    <router-outlet />
  `
})
export class UsersComponent {
  private http = inject(HttpClient);

  users: User[] = [];

  ngOnInit() {
    this.http.get<User[]>(
      'https://jsonplaceholder.typicode.com/users'
    ).subscribe(users => {
      this.users = users;
    })
  }
}
