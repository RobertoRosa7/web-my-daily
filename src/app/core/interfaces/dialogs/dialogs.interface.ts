import { Observable } from 'rxjs';

export class DialogActions {
  public messageAction!: string;
  public messageClose!: string;
}

export class DialogAlert {
  public title!: string;
  public message!: string;
  public actions!: DialogActions;
}

export class dialogData<T> {
  data!: T;
}

export interface ISnackBarActions {
  update: () => Observable<void>;
  delete: () => Observable<void>;
  create: () => Observable<void>;
  liked: () => Observable<void>;
  disliked: () => Observable<void>;
}

export const enum SnackBarActions {
  update = 'update',
  delete = 'delete',
  create = 'create',
  liked = 'liked',
  disliked = 'disliked',
}
