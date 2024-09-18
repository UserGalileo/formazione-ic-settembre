import {Component} from "@angular/core";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  nickname: string;
}

// Stati derivati
@Component({
  selector: "app-active-user",
  standalone: true,
  template: `

    @for (user of users; track user.id) {
      <li
        (click)="activeId = user.id"
        [class.active]="activeUser === user"
      >{{ user.firstName }} {{ user.lastName }}</li>
    }
  `,
  styles: `
    .active {
      font-weight: bold;
      color: red;
    }
  `
})
export class ActiveUserComponent {

  // Stato
  users: User[] = [
    {
      id: 1,
      nickname: 'micheles',
      firstName: 'Michele',
      lastName: 'Stieven',
    },
    {
      id: 2,
      nickname: 'marior',
      firstName: 'Mario',
      lastName: 'Rossi',
    },
    {
      id: 3,
      nickname: 'tiziob',
      firstName: 'Tizio',
      lastName: 'Biondi',
    }
  ];

  activeId: User['id'] | null = null;

  get activeUser() {
    return this.users.find(user => user.id === this.activeId);
  }
}
