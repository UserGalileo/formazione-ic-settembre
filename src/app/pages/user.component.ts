import {Component, inject, Input} from "@angular/core";
import {User} from "../models/user";
import {HttpClient} from "@angular/common/http";
import {JsonPipe} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: "app-user",
  standalone: true,
  imports: [
    JsonPipe,
    RouterLink
  ],
  template: `
    <h3>User {{ id }}: {{ user?.name }}</h3>
    <hr>
    {{ user | json }}
    <hr>
    <button routerLink="/..">Back</button>
  `
})
export class UserComponent {

  private http = inject(HttpClient);

  @Input() id!: string;

  user: User | null = null;

  ngOnInit() {
    this.http.get<User>(
      'https://jsonplaceholder.typicode.com/users/' + this.id
    ).subscribe(user => {
      this.user = user;
    })
  }
}
