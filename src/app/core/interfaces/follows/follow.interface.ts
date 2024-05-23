import { JsonProperty } from '../../decorators/jsons/json.decorator';
import { FollowingStatus } from '../../enums/bases/base.enum';
import { TotalFollowsDto } from '../../../pages/profile/core/interfaces/profile.interface';

export class FollowRequest {
  public ev!: string;
  public userId: undefined | string = undefined;
  public followingId: undefined | string = undefined;
  public followingStatus: FollowingStatus | undefined = undefined;
}

export class ListeningFollowResponse {
  @JsonProperty('user_id')
  public userId: undefined | string = undefined;

  @JsonProperty('follow_id')
  public followId: undefined | string = undefined;

  @JsonProperty({ clazz: TotalFollowsDto })
  public data: undefined | TotalFollowsDto = undefined;
}
