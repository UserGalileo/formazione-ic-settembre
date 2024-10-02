import {inject, Injectable} from "@angular/core";
import {Invoice} from "../models";
import {HttpClient} from "@angular/common/http";
import {delay, of} from "rxjs";

// mock
let invoices: Invoice[] = [
  {
    id: 'invoice-1',
    subject: 'Fattura 1',
    clientId: 'client-1',
    items: [
      { text: 'item 1', price: 10 },
      { text: 'item 2', price: 20 },
    ],
    total: 30
  },
  {
    id: 'invoice-2',
    subject: 'Fattura 2',
    clientId: 'client-2',
    items: [
      { text: 'item 1', price: 100 },
    ],
    total: 100
  }
];

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  // private http = inject(HttpClient);

  loadInvoices() {
    return of(invoices).pipe(
      delay(200)
    );
  }

  deleteInvoice(id: Invoice['id']) {
    invoices = invoices.filter(i => i.id !== id);
    return of(id);
  }

  addInvoice(invoice: Omit<Invoice, 'id'>) {
    const newInvoice = { ...invoice, id: '' + Math.random() };
    invoices = [...invoices, newInvoice];
    return of(newInvoice).pipe(
      delay(200)
    );
  }

  editInvoice(invoice: Invoice) {
    invoices = invoices.map(i => {
      if (i.id === invoice.id) return invoice;
      return i;
    });
    return of(invoice).pipe(
      delay(200)
    )
  }
}
