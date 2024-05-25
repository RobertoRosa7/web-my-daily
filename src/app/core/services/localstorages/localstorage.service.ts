import { Injectable, afterNextRender } from '@angular/core';
import { IData } from '../../interfaces/localstorages/localstorage.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public token$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private readonly store: Store) {
    afterNextRender(() => {
      try {
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

  public clearAll() {
    localStorage.clear();
  }

  private serealizeKey<T>({ data }: IData<T>) {
    return JSON.stringify(data);
  }

  private deserealizeKey<T>(key: string) {
    return JSON.parse(localStorage.getItem(key) as string);
  }
}
