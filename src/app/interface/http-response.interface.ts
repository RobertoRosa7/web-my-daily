export interface HttpResponseDefault<T> {
  data: T | null;
  error: boolean;
  message: string;
}
