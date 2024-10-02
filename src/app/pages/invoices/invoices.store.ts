import {inject, Injectable, signal} from "@angular/core";
import {InvoicesService} from "../../api/services/invoices.service";
import {ClientsService} from "../../api/services/clients.service";
import {Client, Invoice, InvoiceItem} from "../../api/models";
import {forkJoin} from "rxjs";

export class InvoicesStore {

  // Deps
  invoicesService = inject(InvoicesService);
  clientsService = inject(ClientsService);

  // States
  invoices = signal<Invoice[]>([]);
  clients = signal<Client[]>([]);
  loadingInvoices = signal(false);
  loadingClients = signal(false);

  loadInvoices() {
    forkJoin([
      this.invoicesService.loadInvoices(),
      this.clientsService.loadClients()
    ]).subscribe(([invoices, clients]) => {
      this.invoices.set(invoices);
      this.clients.set(clients);
    })
  }

  createInvoice() {
    this.invoicesService.addInvoice({
      subject: '',
      total: 0,
      items: []
    }).subscribe(invoice => {
      this.invoices.update(invoices => [...invoices, invoice]);
    })
  }

  saveInvoice(invoice: Invoice) {
    this.invoicesService.editInvoice(invoice).subscribe(newInvoice => {
      this.invoices.update(invoices => invoices.map(i => i.id === invoice.id ? newInvoice : i))
    })
  }

  deleteInvoice(id: Invoice['id']) {
    this.invoicesService.deleteInvoice(id).subscribe(() => {
      this.invoices.update(invoices => invoices.filter(i => i.id !== id))
    });
  }

}
