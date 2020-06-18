import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsideStatusService {

  SEE = 'SEE';
  CREATE = 'CREATE';
  MODIFIE = 'MODIFIE';

  private asideStatus = new BehaviorSubject<string>(this.SEE);

  constructor() { }

  get(): Observable<string> {
    return this.asideStatus.asObservable();
  }

  toSEE(): void {
    this.asideStatus.next(this.SEE);
  }

  toCREATE(): void {
    this.asideStatus.next(this.CREATE);
  }

  toMODIFIE(): void {
    this.asideStatus.next(this.MODIFIE);
  }
}
