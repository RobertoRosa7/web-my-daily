import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Url } from '../../decorators/urls/url.decorator';
import { PathsEnum } from '../../enums/bases/base.enum';
import {
  DisLikeRequest,
  HappenRequest,
  HappenResponsePageable,
  HttpResponseHappen,
  LikeRequest,
  ProfileHappen,
} from '../../interfaces/happens/profile.happen.interface';
import { HttpResponseDefault } from '../../interfaces/https/http-response.interface';
import {
  CommentRequest,
  HappenCommentHttpResponse,
  HappenCommentSingleTon,
} from '../../interfaces/happens/happen.comment.interface';

@Injectable({
  providedIn: 'root',
})
export class HappenRepository {
  @Url(PathsEnum.pathGetTimeline)
  private urlGetTimeline!: string;

  @Url(PathsEnum.pathGetHappen)
  private urlProfileHappen!: string;

  @Url(PathsEnum.pathDelHappen)
  private urlDeleteHappen!: string;

  @Url(PathsEnum.pathPutHappen)
  private urlUpdateHappen!: string;

  @Url(PathsEnum.pathPostHappen)
  private urlPostHappen!: string;

  @Url(PathsEnum.pathPostDisliked)
  private urlDisliked!: string;

  @Url(PathsEnum.pathPostLiked)
  private urlLiked!: string;

  @Url(PathsEnum.pathGetComments)
  private urlGetHappenComments!: string;

  @Url(PathsEnum.pathPostComment)
  private urlPostHappenComment!: string;

  @Url(PathsEnum.pathPostStoppingViewing)
  private urlPathPostStoppingViewing!: string;

  constructor(private readonly http: HttpClient) {}

  public getTimeline(): Observable<HappenResponsePageable> {
    return this.http.get<HappenResponsePageable>(this.urlGetTimeline);
  }

  /**
   * INFO:
   * getHappens - layer 0
   * @returns Observable<ProfileHappenResponseAsList>
   */
  public getHappens(): Observable<HappenResponsePageable> {
    return this.http.get<HappenResponsePageable>(this.urlProfileHappen);
  }

  /**
   * INFO:
   * deleteHappen - delete one happen
   * @returns Observable<HttpResponseDefault<string>>
   */
  public deleteHappen(happen: ProfileHappen): Observable<HttpResponseDefault<void>> {
    return this.http.delete<HttpResponseDefault<void>>(`${this.urlDeleteHappen}/${happen.id}`);
  }

  /**
   * INFO:
   * updateHappen - update one happen
   * @returns Observable<HttpResponseDefault<string>>
   */
  public updateHappen(happen: ProfileHappen): Observable<HttpResponseHappen> {
    return this.http.put<HttpResponseHappen>(`${this.urlUpdateHappen}/${happen.id}`, {
      text: happen.whatHappen,
      visibility: happen.visibility,
    });
  }

  /**
   * INFO:
   * postHappen - update one happen
   * @returns Observable<HttpResponseDefault<string>>
   */
  public postHappen(happen: ProfileHappen): Observable<HttpResponseHappen> {
    return this.http.post<HttpResponseHappen>(this.urlPostHappen, {
      text: happen.whatHappen,
      visibility: happen.visibility,
    });
  }

  /**
   * INFO:
   * postLiked - post one happen
   * @returns Observable<HttpResponseDefault<string>>
   */
  public postLiked(happen: LikeRequest): Observable<HttpResponseDefault<void>> {
    return this.http.post<HttpResponseDefault<void>>(`${this.urlLiked}`, happen);
  }

  /**
   * INFO:
   * postDisliked - post one happen
   * @returns Observable<HttpResponseDefault<string>>
   */
  public postDisliked(happen: DisLikeRequest): Observable<HttpResponseDefault<void>> {
    return this.http.post<HttpResponseDefault<void>>(`${this.urlDisliked}`, happen);
  }

  /**
   * INFO:
   * getHappenComments - get comments from happen
   * @returns HappenCommentHttpResponse
   */
  public getHappenComments(happen: ProfileHappen): Observable<HappenCommentHttpResponse> {
    return this.http.get<HappenCommentHttpResponse>(`${this.urlGetHappenComments}/${happen.id}`);
  }

  /**
   * INFO:
   * addHappenComments - get comments from happen
   * @returns HappenCommentHttpResponse
   */
  public addHappenComments(comment: CommentRequest): Observable<HappenCommentSingleTon> {
    return this.http.post<HappenCommentSingleTon>(`${this.urlPostHappenComment}`, comment);
  }

  /**
   * INFO:
   * updateHappenComments - get comments from happen
   * @returns HappenCommentHttpResponse
   */
  public updateHappenComments(commentId: string, comment: CommentRequest): Observable<HappenCommentSingleTon> {
    return this.http.put<HappenCommentSingleTon>(`${this.urlPostHappenComment}/${commentId}`, comment);
  }

  /**
   * INFO:
   * deleteHappenComments - get comments from happen
   * @returns void
   */
  public deleteHappenComments(commentId: string): Observable<void> {
    return this.http.delete<void>(`${this.urlPostHappenComment}/${commentId}`);
  }

  /**
   * INFO:
   * stoppingViewing - get comments from happen
   * @returns void
   */
  public stoppingViewing(request: HappenRequest): Observable<void> {
    return this.http.post<void>(this.urlPathPostStoppingViewing, request);
  }
}
