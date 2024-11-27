import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { Observable } from 'rxjs';
import { InDestroyDirective } from '../../directives/destroy/destroy.directive';
import { Store } from '@ngrx/store';
import { selShowMessage } from '@selectors/message/message.selector';
import { acShowMessage } from '@actions/message/message.action';
import { ShowMessage } from '@interfaces/message/message.interface';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule, SharedModule],
  template: `
    <ng-container *ngIf="data$ | async as data">
      <div class="message {{ data.type }}" [class.fade-out]="!data.show">
        <button (click)="closeMessage()" type="button" role="button" mat-icon-button aria-describedby="closeable">
          <mat-icon>close</mat-icon>
        </button>
        <span>{{ data.message }}</span>
      </div>
    </ng-container>
  `,
  styles: [
    `
      .message {
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 5px;
        transition: opacity 0.5s ease-out; /* Adicionando uma transição suave de 0.5 segundos */
        display: flex;
        min-height: 64px;
        position: relative;
      }
      .message button {
        position: absolute;
        right: 0;
        top: 0;
      }
      .message span {
        display: flex;
        padding-left: 1rem;
        padding-right: 1rem;
        font-size: 0.8rem;
        align-items: center;
      }
      .success {
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
      }
      .error {
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
      }
      .info {
        background-color: var(--border-default);
        color: var(--dark);
      }
      .fade-out {
        opacity: 0; /* Define a opacidade para 0 ao ativar a classe .fade-out */
        visibility: hidden;
      }
    `,
  ],
})
export class MessageComponent extends InDestroyDirective {
  public data$: Observable<ShowMessage> = this.store.select(selShowMessage);

  constructor(private readonly store: Store) {
    super();
  }

  /**
   * Processes the close message on display
   */
  public closeMessage(): void {
    this.store.dispatch(
      acShowMessage({
        body: {
          type: '',
          show: false,
          message: '',
        },
      })
    );
  }
}
