import { Observable } from 'rxjs';
import { JsonProperty } from '../../../../core/decorators/json.decorator';
import { HttpResponseDefault } from '../../../../interface/http-response.interface';

export type ProfileHappenResponse = HttpResponseDefault<Array<ProfileHappen>>;
export type ProfileHappenObservable = Observable<Array<ProfileHappen> | null>;

export class ProfileHappenLike {
  @JsonProperty('disliked_count')
  public dislikedCount: number = 0;
  @JsonProperty('liked_count')
  public likedCount: number = 0;
}

export class ProfileHappen {
  @JsonProperty('_id')
  public id: string = '';
  @JsonProperty('name_id')
  public nameId: string | null = '';
  @JsonProperty('updated_at')
  public updateAt: string | null = '';
  @JsonProperty('created_at')
  public createdAt: string | null = '';
  @JsonProperty('user_id')
  public userId: string = '';
  @JsonProperty('visibility')
  public visibility: boolean | null = null;
  @JsonProperty('what_happen')
  public whatHappen: string = '';
  @JsonProperty({ clazz: ProfileHappenLike })
  public likes: ProfileHappenLike = new ProfileHappenLike();
}
