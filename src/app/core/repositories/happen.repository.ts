import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Url } from '../decorators/urls/url.decorator';
import { Paths } from '../enums/bases/base.enum';
import {
  DisLikeRequest,
  HappenResponsePageable,
  HttpResponseHappen,
  LikeRequest,
  ProfileHappen,
} from '../interfaces/happens/profile.happen.interface';
import { HttpResponseDefault } from '../interfaces/https/http-response.interface';
import {
  CommentRequest,
  HappenCommentHttpResponse,
  HappenCommentSingleTon,
} from '../interfaces/happens/happen.comment.interface';

@Injectable({
  providedIn: 'root',
})
export class HappenRepository {
  @Url(Paths.getTimeline)
  private urlGetTimeline!: string;

  @Url(Paths.getHappen)
  private urlProfileHappen!: string;

  @Url(Paths.deleteHappen)
  private urlDeleteHappen!: string;

  @Url(Paths.updateHappen)
  private urlUpdateHappen!: string;

  @Url(Paths.postHappen)
  private urlPostHappen!: string;

  @Url(Paths.disliked)
  private urlDisliked!: string;

  @Url(Paths.liked)
  private urlLiked!: string;

  @Url(Paths.getHappenComments)
  private urlGetHappenComments!: string;

  @Url(Paths.postHappenComment)
  private urlPostHappenComment!: string;

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
    return this.http.post<HttpResponseHappen>(`${this.urlPostHappen}`, {
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
   * @returns HappenCommentHttpResponse
   */
  public deleteHappenComments(commentId: string): Observable<void> {
    return this.http.delete<void>(`${this.urlPostHappenComment}/${commentId}`);
  }
}
