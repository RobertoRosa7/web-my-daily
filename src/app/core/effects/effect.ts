import { acShowMessage } from '@actions/message/message.action';
import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ShowMessage } from '@interfaces/message/message.interface';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

export abstract class Effect {
  protected readonly store: Store = inject(Store);

  /**
   * Dispatch action to update display message
   *
   * @param message string
   * @param type string
   */
  protected showMessage(message: string, type: string): void {
    this.store.dispatch(
      acShowMessage({
        body: this.buildShowMessage(message, type),
      })
    );
  }

  /**
   * Constructs an error message for display.
   * @param message The error message.
   */
  protected buildShowMessage(message: string, type: string): ShowMessage {
    const body = new ShowMessage();

    body.message = message;
    body.type = type;
    body.show = true;

    return body;
  }

  /**
   * Handles errors by dispatching a show message action.
   * @param error The HTTP error response.
   */
  protected handlerError({ error }: HttpErrorResponse) {
    const message = error?.message || 'Não possível realizar operação';

    return of(
      acShowMessage({
        body: this.buildShowMessage(message, 'error'),
      })
    );
  }

  /**
   * Processes the close message on display
   */
  protected closeMessage(): void {
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
