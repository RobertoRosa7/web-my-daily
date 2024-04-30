import { Injectable } from '@angular/core';
import { IData } from '../interfaces/localstorage.interface';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getKey(key: string) {
    return this.deserealizeKey(key);

  }

  setKey<T>(key: string, data: IData<T>) {
    localStorage.setItem(key, this.serealizeKey(data));
  }

  clearKey(key: string) {
    localStorage.removeItem(key);
  }

  serealizeKey<T>({ data }: IData<T>) {
    return JSON.stringify(data);
  }

  deserealizeKey<T>(key: string) {
    return JSON.parse(localStorage.getItem(key) as string);
  }
}
