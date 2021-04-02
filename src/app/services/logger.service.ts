import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable()
export class LoggerService {

  constructor() {
  }

  log(msg: string): void {
    if (!environment.production) {
      console.log(msg);
    }
  }

  logError(msg: string): void {
    if (!environment.production) {
      console.error(msg);
    }
  }
}
