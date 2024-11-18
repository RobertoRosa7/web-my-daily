import { Observable } from 'rxjs';
import { JsonProperty } from '../../../../core/decorators/jsons/json.decorator';
import { HttpResponseDefault } from '../../../../core/interfaces/https/http-response.interface';
import { PageableUser, SingletonOrPageable } from '../../../../core/interfaces/pageables/pageable.interface';
import { FollowingStatus } from '../../../../core/enums/bases/base.enum';

export type PageableOrUserProfile = PageableUser | UserProfile;
export type ProfileResponse = HttpResponseDefault<PageableOrUserProfile>;
export type ProfileObservable = Observable<UserProfile | null>;
export type ProfilePublicObservable = Observable<boolean>;
export type ProfileSingletonOrPageable = SingletonOrPageable<PageableOrUserProfile>;
export type ProfilePublicReponseObservable = Observable<ProfileSingletonOrPageable>;

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

export class User {
  @JsonProperty('_id')
  public id: string | undefined = undefined;
  public email: string | undefined = undefined;
  public name: string | undefined = undefined;
  public phone: string | undefined = undefined;
  public genre: string | undefined = undefined;

  @JsonProperty('profile_public')
  public profilePublic: boolean | undefined = undefined;
  @JsonProperty('following_status')
  public followingStatus: FollowingStatus | undefined = undefined;
  @JsonProperty('name_id')
  public nameId: string | undefined = undefined;
  @JsonProperty('auth_id')
  public authId: string | undefined = undefined;
  @JsonProperty('created_at')
  public createdAt: string | undefined = undefined;
  @JsonProperty('updated_at')
  public updatedAt: string | undefined = undefined;
}

export class UserProfile extends User {
  @JsonProperty({ clazz: MsUserProfileResponse })
  public profile: MsUserProfileResponse = new MsUserProfileResponse();

  @JsonProperty({ clazz: TotalFollowsDto })
  public follows: TotalFollowsDto = new TotalFollowsDto();
}

export class ProfileSingleResponse extends HttpResponseDefault<UserProfile> {
  @JsonProperty({ clazz: UserProfile })
  public override data: UserProfile = new UserProfile();
}

export class HttpUserResponse extends HttpResponseDefault<User> {
  @JsonProperty({ clazz: User })
  public override data: User = new User();
  public isLoading?: boolean;
  public messageOk?: string;
  public messageNok?: string;
}
