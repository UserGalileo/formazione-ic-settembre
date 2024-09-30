import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {delay, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private http = inject(HttpClient);

  getSuggestions(searchTerm: string) {
    console.log('chiamo il server...')
    return of([
      searchTerm + '...',
      searchTerm + '...',
      searchTerm + '...',
    ]).pipe(
      delay(1500)
    );
  }
}
