import {Component, inject} from "@angular/core";
import {InvoicesStore} from "./invoices.store";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

@Component({
  selector: "app-invoices",
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  providers: [InvoicesStore],
  template: `
    <div class="invoices-container">
      <div class="invoice-list">
        <h3>Invoices</h3>
        <ul>
          @for (invoice of store.invoices(); track invoice.id) {
            <li>
              <a
                class="invoice-list-item"
                [routerLink]="'/invoices/' + invoice.id"
                routerLinkActive="active"
              >
                {{ invoice.subject || 'New invoice' }}
              </a>
            </li>
          }
        </ul>
        <button (click)="store.createInvoice()">New invoice</button>
      </div>
      <div class="invoice-edit">
        <router-outlet />
      </div>
    </div>
  `,
})
export class InvoicesComponent {

  store = inject(InvoicesStore);

  ngOnInit() {
    this.store.loadInvoices();
  }
}
