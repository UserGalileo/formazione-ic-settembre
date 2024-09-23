import {Injectable} from "@angular/core";

@Injectable()
export class AdminService {

  constructor() {
    console.log('Admin Service creato.');
  }

  ngOnDestroy() {
    console.log('Admin Service distrutto.');
  }
}
