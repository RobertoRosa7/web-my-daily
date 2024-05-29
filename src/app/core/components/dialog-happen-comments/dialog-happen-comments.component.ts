import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { ProfileHappen } from '../../interfaces/happens/profile.happen.interface';
import { FollowerPipe } from '../../pipes/followers/follwers.pipe';
import { Store } from '@ngrx/store';
import { selectHappenActive, selectorComments } from '../../selectors/happens/profile.happens.selector';
import { CommentComponent } from '../comments/comment.component';
import { Observable, map } from 'rxjs';
import { CommentRequest, HappenComment } from '../../interfaces/happens/happen.comment.interface';
import { selectorId } from '../../../pages/profile/core/selectors/user.selector';
import { FormControl } from '@angular/forms';
import {
  happenCommentDeleteRemote,
  happenCommentPutRemote,
  happenCommentRemote,
} from '../../actions/happens/comment.action';

@Component({
  selector: 'app-dialog-comments',
  templateUrl: './dialog-happen-comments.component.html',
  styleUrl: './dialog-happen-comments.component.scss',
  standalone: true,
  imports: [CommonModule, SharedModule, FollowerPipe, CommentComponent],
})
export class DialogHappenCommentsComponent {
  public form: FormControl = new FormControl('');
  private readonly store: Store = inject(Store);

  public readonly happen$ = this.store
    .select(selectHappenActive)
    .pipe(map(({ happenActive }) => this.profileToComment(happenActive)));

  public readonly comments$ = this.store.select(selectorComments);
  public readonly userId$: Observable<string | undefined> = this.store.select(selectorId);

  public addComment(comment: HappenComment) {
    const request = new CommentRequest();
    request.text = this.form.value.trim();

    request.happenId = comment.happenId || '';
    request.ownerId = comment.ownerId || '';

    this.store.dispatch(happenCommentRemote(request));
    this.form.reset();
  }
  
  public onDelete(comment: HappenComment) {
    this.store.dispatch(happenCommentDeleteRemote({ commentId: comment.id || '' }));
  }

  public onComment(comment: HappenComment) {
    const request = new CommentRequest();
    request.text = comment.text;
    request.happenId = comment.happenId || '';
    request.ownerId = comment.ownerId || '';

    this.store.dispatch(happenCommentPutRemote({ commentId: comment.id || '', request }));
  }

  private profileToComment(profile: ProfileHappen): HappenComment {
    const comment = new HappenComment();
    comment.createdAt = profile.createdAt || '';
    comment.happenId = profile.id;
    comment.nameId = profile.nameId || '';
    comment.ownerId = profile.userId;
    comment.userId = profile.userId;
    comment.text = profile.whatHappen;
    comment.scoreNegative = profile.feelings.scoreNegative;
    comment.scorePositive = profile.feelings.scorePositive;
    comment.nickname = profile.nickname || '';
    comment.sentiment = profile.feelings.sentiment || '';

    return comment;
  }
}
