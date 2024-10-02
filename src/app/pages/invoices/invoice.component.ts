import {Component, computed, effect, inject, input} from "@angular/core";
import {FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {InvoicesStore} from "./invoices.store";
import {map, startWith} from "rxjs";
import {InvoiceItem} from "../../api/models";
import {Router} from "@angular/router";
import {toSignal} from "@angular/core/rxjs-interop";

type InvoiceItemGroup = FormGroup<{
  text: FormControl<string>;
  price: FormControl<number>;
}>

@Component({
  selector: "app-invoice",
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  template: `
    <h1 class="invoice-header">Invoice</h1>

    <form [formGroup]="form" (ngSubmit)="saveInvoice()">
      <label>
        <span>Subject</span>
        <input type="text" formControlName="subject">
      </label>

      <label>
        <span>Client</span>
        <select formControlName="clientId">
          <option [value]="''">-</option>
          @for (client of store.clients(); track client.id) {
            <option [value]="client.id">{{ client.name }}</option>
          }
        </select>
      </label>

      <div formArrayName="items">
        @for (item of form.controls.items.controls; track item; let i = $index) {
          <div class="invoice-item" [formGroupName]="i">
            <input type="text" formControlName="text" placeholder="Item">
            <input type="number" formControlName="price" placeholder="Price">
            <button type="button" (click)="removeItem(i)" class="btn-danger">Remove</button>
          </div>
        }
        <button type="button" (click)="addItem()">New item</button>
      </div>
      <h2 class="invoice-total">Total: €{{ total() }}</h2>
      <button [attr.aria-disabled]="!form.valid || null">Save</button>
      <button type="button" (click)="deleteInvoice()" class="btn-danger">Delete</button>
    </form>
  `
})
export class InvoiceComponent {

  // Deps
  fb = inject(NonNullableFormBuilder);
  store = inject(InvoicesStore);
  router = inject(Router);

  // Form
  form = this.fb.group({
    id: ['', Validators.required],
    subject: ['', Validators.required],
    clientId: ['', Validators.required],
    items: this.fb.array([] as InvoiceItemGroup[])
  });

  // States
  invoiceId = input.required<string>({ alias: 'id' });

  // Derived states
  currentInvoice = computed(() => this.store.invoices().find(invoice => invoice.id === this.invoiceId()));

  total = toSignal(this.form.valueChanges.pipe(
    startWith(this.form.getRawValue()),
    map(() => this.calculateTotal(this.form.getRawValue().items))
  ));

  constructor() {
    effect(() => {
      const invoice = this.currentInvoice();

      if (invoice) {
        this.form.controls.items.clear();
        invoice.items.forEach(() => this.addItem());
        this.form.reset(invoice);
      }
    });
  }

  saveInvoice() {
    if (this.form.valid) {
      this.store.saveInvoice({
        ...this.form.getRawValue(),
        total: this.calculateTotal(this.form.getRawValue().items),
        id: this.invoiceId()
      })
    }
  }

  deleteInvoice() {
    this.store.deleteInvoice(this.invoiceId());
    this.router.navigateByUrl('/invoices');
  }

  removeItem(i: number) {
    this.form.controls.items.removeAt(i);
  }

  addItem() {
    this.form.controls.items.push(this.createItem());
  }

  createItem() {
    return this.fb.group({
      text: ['', Validators.required],
      price: [0, Validators.required],
    });
  }

  calculateTotal(items: InvoiceItem[]) {
    return items.reduce((total, item) => total + item.price, 0);
  }
}
