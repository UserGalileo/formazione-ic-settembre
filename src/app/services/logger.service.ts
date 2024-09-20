import {Injectable} from "@angular/core";

@Injectable()
export class LoggerService {

  constructor() {
    console.log('creato')
  }

  log(msg: string) {
    console.log(msg);
  }
}
