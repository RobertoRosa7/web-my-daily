import { Observable } from 'rxjs';
import { JsonProperty } from '../../../../core/decorators/json.decorator';
import { HttpResponseDefault } from '../../../../interfaces/http-response.interface';

export type HttpResponseHappen = HttpResponseDefault<ProfileHappen>;
export type ProfileHappenObservable = Observable<Array<ProfileHappen> | undefined>;

export class ProfileHappenLike {
  @JsonProperty('disliked_count')
  public dislikedCount: number = 0;
  @JsonProperty('liked_count')
  public likedCount: number = 0;
}

export class Feelings {
  @JsonProperty('_id')
  public id: string | undefined = undefined;
  @JsonProperty('accuracy_score')
  public accuracyScore: number = 0;
  @JsonProperty('model_version')
  public modelVersion: string | undefined = undefined;
  @JsonProperty('name_model')
  public nameModel: string | undefined = undefined;
  @JsonProperty('score_negative')
  public scoreNegative: number = 0;
  @JsonProperty('score_positive')
  public scorePositive: number = 0;
  @JsonProperty('updated_at')
  public updatedAt: string = new Date().toISOString();
  @JsonProperty('created_at')
  public createdAt: string = new Date().toISOString();
  @JsonProperty('user_id')
  public userId: string | undefined = undefined;
  @JsonProperty('what_happen_id')
  public whatHappenId: string | undefined = undefined;

  public sentiment: string | undefined = undefined;
  public text: string | undefined = undefined;
}

export class ProfileHappen {
  @JsonProperty('_id')
  public id: string = '';
  @JsonProperty('name_id')
  public nameId: string | null = '';
  @JsonProperty('updated_at')
  public updateAt: string | null = new Date().toDateString();
  @JsonProperty('created_at')
  public createdAt: string | null = new Date().toDateString();
  @JsonProperty('user_id')
  public userId: string = '';
  @JsonProperty('visibility')
  public visibility: string | null = null;
  @JsonProperty('what_happen')
  public whatHappen: string = '';
  @JsonProperty({ clazz: ProfileHappenLike })
  public likes: ProfileHappenLike = new ProfileHappenLike();

  @JsonProperty({ clazz: Feelings })
  public feelings: Feelings = new Feelings();
}

export class HappenResponsePageable extends HttpResponseDefault<Array<ProfileHappen>> {
  @JsonProperty({ clazz: ProfileHappen })
  public override data: ProfileHappen[] | undefined = undefined;
}

export class HappenSingleton extends HttpResponseDefault<ProfileHappen> {
  @JsonProperty({ clazz: ProfileHappen })
  public override data: ProfileHappen | undefined = undefined;
}
