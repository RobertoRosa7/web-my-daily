import { BehaviorSubject, filter, map, of } from 'rxjs';
import { DisLikeRequest, LikeRequest, ProfileHappen } from '../../interfaces/happens/profile.happen.interface';
import { Store } from '@ngrx/store';
import {
  happenDeleteRemote,
  happenDeleteRollback,
  happenPostRemote,
  happenPostRollback,
  happenUpdateRemote,
  happenUpdateRollback,
} from '../../actions/happens/profile.happens.action';
import {
  actionDislikedLocal,
  actionDislikedRemote,
  actionLikedLocal,
  actionLikedRemote,
} from '../../actions/happens/likes.action';
import { selectHappenError } from '../../selectors/happens/profile.happens.selector';
import { ISnackBarActions } from '../../interfaces/dialogs/dialogs.interface';

export class DialogHelperService implements ISnackBarActions {
  public static readonly previousText$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public static readonly previousLike$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public static readonly previousDisLike$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly index: number,
    private readonly isDismissed: boolean,
    private readonly data: ProfileHappen,
    private readonly store: Store
  ) {}

  /**
   * INFO:
   * likedBuilder - responsible to create new instance of request disliked to send to the service
   *
   * @param isDisliked boolean (required)
   * @param data ProfileHappen (required)
   * @returns LikeRequest
   */
  public static likedBuilder(isLiked: boolean, data: ProfileHappen): LikeRequest {
    const request = new LikeRequest();
    request.isLiked = !isLiked;
    request.ownerId = data.userId;
    request.happenId = data.id;

    return request;
  }

  /**
   * INFO:
   * dislikeBuilder - responsible to create new instance of request disliked to send to the service
   *
   * @param isDisliked boolean (required)
   * @param data ProfileHappen (required)
   * @returns DisLikeRequest
   */
  public static dislikeBuilder(isDisliked: boolean, data: ProfileHappen): DisLikeRequest {
    const request = new DisLikeRequest();
    request.disliked = !isDisliked;
    request.ownerId = data.userId;
    request.happenId = data.id;

    return request;
  }

  /**
   * INFO:
   * happenWithIndex - return data happen with current index to help operations
   */
  public get happenWithIndex() {
    return {
      index: this.index,
      data: this.data,
    };
  }

  /**
   * INFO:
   *
   * update - responsible to update local happen and dispatch action when user not cancel
   * and also listening event of http error and delegate to component handler it.
   *
   * @returns Observable
   */
  public update() {
    // reference class static methods
    const self = DialogHelperService;

    // if user cancel click on button snackbar action
    if (this.isDismissed) {
      // dispatch rollback and recovery some data of states store
      this.store.dispatch(
        happenUpdateRollback({
          index: this.index,
          data: { ...this.data, whatHappen: self.previousText$.getValue() },
        })
      );
      return of();
    }

    // no action of cancel, so dispatch action to remove on database services
    this.store.dispatch(happenUpdateRemote(this.happenWithIndex));
    return this.listeningError();
  }

  /**
   * INFO:
   *
   * delete - responsible to delete local happen and dispatch action when user not cancel
   * and also listening event of http error and delegate to component handler it.
   *
   * @returns Observable
   */
  public delete() {
    // if user cancel click on button snackbar action
    if (this.isDismissed) {
      this.store.dispatch(happenDeleteRollback(this.happenWithIndex));
      return of();
    }

    // no action of cancel, so dispatch action to remove on database services
    this.store.dispatch(happenDeleteRemote(this.happenWithIndex));
    return this.listeningError();
  }

  /**
   * INFO:
   *
   * create - responsible to create local happen and dispatch action when user not cancel
   * and also listening event of http error and delegate to component handler it.
   *
   * @returns Observable
   */
  public create() {
    // if user cancel click on button snackbar action
    if (this.isDismissed) {
      this.store.dispatch(happenPostRollback(this.happenWithIndex));
      return of();
    }

    // no action of cancel, so dispatch action to remove on database services
    this.store.dispatch(happenPostRemote(this.happenWithIndex));
    return this.listeningError();
  }

  /**
   * INFO:
   *
   * liked - responsible to liked local happen and dispatch action when user not cancel
   * and also listening event of http error and delegate to component handler it.
   *
   * @returns Observable
   */
  public liked() {
    // reference class static methods
    const self = DialogHelperService;

    // get previous like to rollback
    const liked = self.previousLike$.getValue();

    // builder like request
    const builder = (value: boolean) => ({
      index: this.index,
      request: self.likedBuilder(value, this.data),
    });

    // if user cancel click on button snackbar action
    if (this.isDismissed) {
      this.store.dispatch(actionLikedLocal(builder(liked)));
      return of();
    }

    // no action of cancel, so dispatch action to remove on database services
    this.store.dispatch(actionLikedRemote(builder(!liked)));
    return this.listeningError();
  }

  /**
   * INFO:
   *
   * disliked - responsible to disliked local happen and dispatch action when user not cancel
   * and also listening event of http error and delegate to component handler it.
   *
   * @returns Observable
   */
  public disliked() {
    // reference class static methods
    const self = DialogHelperService;

    // get previous like to rollback
    const disliked = self.previousDisLike$.getValue();

    // builder dislike request
    const builder = (value: boolean) => ({
      index: this.index,
      request: self.dislikeBuilder(value, this.data),
    });

    // if user cancel click on button snackbar action
    if (this.isDismissed) {
      this.store.dispatch(actionDislikedLocal(builder(disliked)));
      return of();
    }

    // no action of cancel, so dispatch action to remove on database services
    this.store.dispatch(actionDislikedRemote(builder(!disliked)));
    return this.listeningError();
  }

  /**
   * INFO:
   * listeningError - responsible to listening some error comes from backend service
   *
   * @returns void or throw Error
   */
  public listeningError() {
    return this.store.select(selectHappenError).pipe(
      filter((error) => !!error),
      map((e) => {
        throw new Error(e?.error);
      })
    );
  }
}
