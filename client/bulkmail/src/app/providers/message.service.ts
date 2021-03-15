import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class MessageService {

    private messageSource = new Subject<any[]>();
    private clearSource = new Subject<string>();

    messageObserver = this.messageSource.asObservable();
    clearObserver = this.clearSource.asObservable();

    add(message) {
        if (message) {
            this.messageSource.next(message);
        }
    }

    addAll(messages: any[]) {
        if (messages && messages.length) {
            this.messageSource.next(messages);
        }
    }

    clear(key?: string) {
        this.clearSource.next(key || null);
    }

}
