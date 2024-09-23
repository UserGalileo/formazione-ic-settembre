import {InjectionToken} from "@angular/core";

export const AuthService = new InjectionToken("AuthService", {
  providedIn: "root",
  factory: () => {
    return {
      isLogged() {
        return true;
      }
    }
  }
});
