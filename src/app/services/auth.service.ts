import {InjectionToken} from "@angular/core";
import {delay, of} from "rxjs";

export const AuthService = new InjectionToken("AuthService", {
  providedIn: "root",
  factory: () => {
    return {
      isLogged() {
        return of(true).pipe(
          delay(200)
        );
      }
    }
  }
});
