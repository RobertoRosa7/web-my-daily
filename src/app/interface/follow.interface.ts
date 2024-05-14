import { JsonProperty } from '../core/decorators/json.decorator';
import { TotalFollowsDto } from '../pages/profile/core/interfaces/profile.interface';


export class FollowRequest {
  public ev!: string;
  public userId: undefined | string = undefined;
  public followId: undefined | string = undefined;
}


export class ListeningFollowResponse {
  @JsonProperty('user_id')
  public userId: undefined | string = undefined;

  @JsonProperty('follow_id')
  public followId: undefined | string = undefined;

  @JsonProperty({ clazz: TotalFollowsDto })
  public data: undefined | TotalFollowsDto = undefined;
}
