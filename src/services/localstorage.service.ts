import { Injectable, afterNextRender } from '@angular/core';
import { IData } from '../app/interface/localstorage.interface';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private token$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor() {
    afterNextRender(() => {
      try {
        this.token$.next(this.deserealizeKey('token'));
      } catch (err) {}
    });
  }

  public getTokenStream(): Observable<string | null> {
    return this.token$.asObservable();
  }

  public getKey(key: string) {
    return this.deserealizeKey(key);
  }

  public setKey<T>(key: string, data: IData<T>) {
    localStorage.setItem(key, this.serealizeKey(data));
  }

  public clearKey(key: string) {
    localStorage.removeItem(key);
  }

  private serealizeKey<T>({ data }: IData<T>) {
    return JSON.stringify(data);
  }

  private deserealizeKey<T>(key: string) {
    return JSON.parse(localStorage.getItem(key) as string);
  }
}
