import {inject, Injectable} from "@angular/core";
import {Client} from "../models";
import {HttpClient} from "@angular/common/http";
import {delay, of} from "rxjs";

// mock
let clients: Client[] = [
  {
    id: 'client-1',
    name: 'Mario Rossi'
  },
  {
    id: 'client-2',
    name: 'John Doe'
  }
]

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  // private http = inject(HttpClient);

  loadClients() {
    return of(clients).pipe(
      delay(200)
    )
  }
}
