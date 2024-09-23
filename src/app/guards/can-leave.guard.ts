import {CanDeactivateFn} from "@angular/router";
import {Observable} from "rxjs";

export interface CanLeave {
  canLeave(): boolean | Promise<boolean> | Observable<boolean>;
}

export const canLeaveGuard: CanDeactivateFn<CanLeave> = (
  component
) => {
  return component.canLeave();
}
