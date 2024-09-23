import {Component} from "@angular/core";

@Component({
  selector: 'app-dumb',
  standalone: true,
  template: `
    {{ count }}
  `,
})
export class DumbComponent {
  count = 0;

  ngOnInit() {
    setInterval(() => {
      this.count++;
    }, 1000);
  }
}

