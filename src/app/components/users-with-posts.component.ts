import {Component, inject} from "@angular/core";
import {JsonPipe} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";
import {Post} from "../models/post";

@Component({
  selector: "app-users-with-posts",
  standalone: true,
  template: `
    <h3>Users:</h3>
    @for (user of users; track user.id) {
      <li
        [class.active]="user.id === activeUser"
        (click)="setActive(user.id)"
      >{{ user.name }}
      </li>
    } @empty {
      No users.
    }
    <hr>
    <h3>Posts:</h3>
    @for (post of posts; track post.id) {
      <li>{{ post.title }}</li>
    } @empty {
      Select a user to see their posts.
    }
  `,
  imports: [
    JsonPipe
  ],
  styles: `
    .active {
      font-weight: bold;
    }
  `
})
export class UsersWithPostsComponent {
  private http = inject(HttpClient);

  // Stato
  users: User[] = [];
  activeUser: User['id'] | null = null;
  // Stato derivato ASINCRONO
  posts: Post[] = [];

  ngOnInit() {
    this.http.get<User[]>(
      'https://jsonplaceholder.typicode.com/users'
    ).subscribe(users => {
      this.users = users;
    })
  }

  setActive(id: User['id']) {
    this.activeUser = id;

    this.http.get<Post[]>(
      'https://jsonplaceholder.typicode.com/posts',
      { params: { userId: id } }
    ).subscribe(posts => {
      this.posts = posts;
    })
  }
}
