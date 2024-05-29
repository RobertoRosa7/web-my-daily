import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  DisLikeRequest,
  HappenResponsePageable,
  HappenSingleton,
  HttpResponseHappen,
  LikeHttpResponse,
  LikeRequest,
  ProfileHappen,
} from '../../interfaces/happens/profile.happen.interface';
import { JsonMapProperties } from '../../decorators/jsons/json.decorator';
import { HttpResponseDefault } from '../../interfaces/https/http-response.interface';
import { HappenRepository } from '../../repositories/happen.repository';
import {
  CommentRequest,
  HappenCommentHttpResponse,
  HappenCommentSingleTon,
} from '../../interfaces/happens/happen.comment.interface';

@Injectable({
  providedIn: 'root',
})
export class HappenService {
  private readonly repository: HappenRepository = inject(HappenRepository);

  /**
   * INFO:
   * getTimeline - responsible to get timeline from users
   * @returns Observable<HappenResponsePageable>
   */
  public getTimeline(): Observable<HappenResponsePageable> {
    return this.repository
      .getTimeline()
      .pipe(map((data) => JsonMapProperties.deserialize(HappenResponsePageable, data)));
  }
  /**
   * INFO:
   * getHappens - layer 1
   * @returns Observable<ProfileHappenResponse>
   */
  public getHappens(): Observable<HappenResponsePageable> {
    return this.repository
      .getHappens()
      .pipe(map((data) => JsonMapProperties.deserialize(HappenResponsePageable, data)));
  }

  /**
   * INFO:
   * deleteHappen - delete one happen
   * @returns Observable<HttpResponseDefault<void>>
   */
  public deleteHappen(happen: ProfileHappen): Observable<HttpResponseDefault<void>> {
    return this.repository.deleteHappen(happen);
  }

  /**
   * INFO:
   * updateHappen - update one happen
   * @returns Observable<HttpResponseDefault<updateHappen>>
   */
  public updateHappen(happen: ProfileHappen): Observable<HttpResponseHappen> {
    return this.repository
      .updateHappen(happen)
      .pipe(map((data) => JsonMapProperties.deserialize(HappenSingleton, data)));
  }

  /**
   * INFO:
   * postHappen - post one happen
   * @returns Observable<HttpResponseDefault<updateHappen>>
   */
  public postHappen(happen: ProfileHappen): Observable<HttpResponseHappen> {
    return this.repository.postHappen(happen).pipe(map((data) => JsonMapProperties.deserialize(HappenSingleton, data)));
  }

  /**
   * INFO:
   * postLiked - update one happen
   * @returns Observable<HttpResponseDefault<string>>
   */
  public postLiked(liked: LikeRequest): Observable<HttpResponseDefault<void>> {
    return this.repository.postLiked(liked).pipe(map((data) => JsonMapProperties.deserialize(LikeHttpResponse, data)));
  }

  /**
   * INFO:
   * postDisliked - update one happen
   * @returns Observable<HttpResponseDefault<string>>
   */
  public postDisliked(disliked: DisLikeRequest): Observable<HttpResponseDefault<void>> {
    return this.repository
      .postDisliked(disliked)
      .pipe(map((data) => JsonMapProperties.deserialize(LikeHttpResponse, data)));
  }

  /**
   * INFO:
   * getHappenComments - get comments from happen
   * @returns HappenCommentHttpResponse
   */
  public getHappenComments(happen: ProfileHappen): Observable<HappenCommentHttpResponse> {
    return this.repository
      .getHappenComments(happen)
      .pipe(map((data) => JsonMapProperties.deserialize(HappenCommentHttpResponse, data)));
  }

  /**
   * INFO:
   * addHappenComments - get comments from happen
   * @returns HappenCommentHttpResponse
   */
  public addHappenComments(request: CommentRequest): Observable<HappenCommentSingleTon> {
    return this.repository
      .addHappenComments(request)
      .pipe(map((data) => JsonMapProperties.deserialize(HappenCommentSingleTon, data)));
  }

  /**
   * INFO:
   * updateHappenComments - get comments from happen
   * @returns HappenCommentHttpResponse
   */
  public updateHappenComments(commentId: string, request: CommentRequest): Observable<HappenCommentSingleTon> {
    return this.repository
      .updateHappenComments(commentId, request)
      .pipe(map((data) => JsonMapProperties.deserialize(HappenCommentSingleTon, data)));
  }

  /**
   * INFO:
   * deleteHappenComments - get comments from happen
   * @returns HappenCommentHttpResponse
   */
  public deleteHappenComments(commentId: string): Observable<void> {
    return this.repository.deleteHappenComments(commentId);
  }
}
