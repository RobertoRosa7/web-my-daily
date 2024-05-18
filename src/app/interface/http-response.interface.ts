import { HttpErrorResponse } from '@angular/common/http';

export class HttpResponseDefault<T> {
  public data: T | undefined = undefined;
  public error: boolean | undefined | HttpErrorResponse = undefined;
  public message: string | undefined = undefined;
}
