import { Injectable } from '@angular/core';
import { IData } from '../interfaces/localstorage.interface';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

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
