import { HttpErrorResponse } from '@angular/common/http';

export class BaseHttpResponse {
  public error: boolean | undefined | HttpErrorResponse = undefined;
  public message: string | undefined = undefined;
}

export class HttpResponseDefault<T> extends BaseHttpResponse {
  public data: T | undefined = undefined;
}

export class HttpResponseList<T> extends BaseHttpResponse {
  public data: Array<T> | undefined = undefined;
}
