import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  loaderSubject = new BehaviorSubject<boolean>(false);

  setLoader(state: boolean) {
    this.loaderSubject.next(state);
  }

  getLoader(): Observable<boolean> {
    return this.loaderSubject.asObservable();
  }
}
