import { Component } from "@angular/core";

@Component({
  selector: "app-profile-photo",
  standalone: true,
  template: `
    <div class="profile-photo">
      <h3>Hello, I'm a picture!</h3>
    </div>
  `,
  styles: `
    h3 {
      color: red;
    }
  `,
})
export class ProfilePhotoComponent {}


