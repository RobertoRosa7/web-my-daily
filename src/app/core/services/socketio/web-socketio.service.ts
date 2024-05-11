import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket = io('ws://localhost:5000');
  private payload: Subject<any> = new Subject<any>();
  
  private platform = inject(PLATFORM_ID);

  constructor() {}

  public send(msg: any) {
    this.socket.emit('send_messages', msg);
  }

  public fetchMessages(): Observable<any> {
    return this.payload.asObservable();
  }
}
