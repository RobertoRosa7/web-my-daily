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

export const enum SnackBarActions {
  update = 'update',
  delete = 'delete',
  create = 'create',
}
