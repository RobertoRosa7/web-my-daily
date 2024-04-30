export interface HttpResponseDefault<T> {
  data: T;
  error: boolean;
  message: string;
}
