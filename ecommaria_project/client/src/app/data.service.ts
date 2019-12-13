import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class DataService {

  private authSource = new BehaviorSubject('No Authentication Token Found');
  currentAuth = this.authSource.asObservable();

  constructor() { }

  changeAuth(auth: string) {
    this.authSource.next(auth)
  }

}