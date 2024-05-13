export class HttpResponseDefault<T> {
  public data: T | undefined = undefined;
  public error: boolean | undefined = undefined;
  public message: string | undefined = undefined;
}
