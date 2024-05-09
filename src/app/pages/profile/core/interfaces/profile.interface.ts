import { Observable } from 'rxjs';
import { JsonProperty } from '../../../../core/decorators/json.decorator';
import { HttpResponseDefault } from '../../../../interface/http-response.interface';

export type UserProfileResponse = HttpResponseDefault<UserProfile>;
export type profileObservable = Observable<UserProfile | null>;
export type profilePublicObservable = Observable<boolean>;

export class MsUserProfileChartResponse {
  public negative: number = 0;
  public positive: number = 0;
}

export class MsUserProfileResponse {
  @JsonProperty('mean_feeling')
  public meanFeeling: number = 0;
  @JsonProperty('std_feeling')
  public stdFeeling: number = 0;
  @JsonProperty('total_negative')
  public totalNegative: number = 0;
  @JsonProperty('total_positive')
  public totalPositive: number = 0;
  @JsonProperty('total_registers')
  public totalRegisters: number = 0;
  @JsonProperty('total_score_negative')
  public totalScoreNegative: number = 0;
  @JsonProperty('total_score_positive')
  public totalScorePositive: number = 0;
  @JsonProperty({ clazz: MsUserProfileChartResponse })
  public chart: MsUserProfileChartResponse = new MsUserProfileChartResponse();
}

export class TotalFollowsDto {
  @JsonProperty('total_following')
  public totalFollowing: number = 0;
  @JsonProperty('total_followers')
  public totalFollowers: number = 0;
}

export class UserProfile {
  @JsonProperty('_id')
  public id: string | undefined = undefined;
  public email: string | undefined = undefined;
  public name: string | undefined = undefined;
  public phone: string | undefined = undefined;
  public genre: string | undefined = undefined;

  @JsonProperty('profile_public')
  public profilePublic: boolean | undefined = undefined;
  @JsonProperty('name_id')
  public nameId: string | undefined = undefined;
  @JsonProperty('auth_id')
  public authId: string | undefined = undefined;
  @JsonProperty('created_at')
  public createdAt: string | undefined = undefined;
  @JsonProperty('updated_at')
  public updatedAt: string | undefined = undefined;

  @JsonProperty({ clazz: MsUserProfileResponse })
  public profile: MsUserProfileResponse = new MsUserProfileResponse();

  @JsonProperty({ clazz: TotalFollowsDto })
  public total_follows: TotalFollowsDto = new TotalFollowsDto();
}
