export class DialogActions {
  public messageAction!: string;
  public messageClose!: string;
}

export class DialogAlert {
  public title!: string;
  public message!: string;
  public actions!: DialogActions;
}
