import { JsonProperty } from '../../decorators/jsons/json.decorator';
import { HttpResponseDefault } from '../https/http-response.interface';

export class CommentRequest {
  ownerId!: string;
  happenId!: string;
  text!: string;
}

export class HappenComment {
  @JsonProperty('_id')
  id: string | undefined = undefined;
  @JsonProperty('created_at')
  createdAt: string = new Date().toISOString();
  @JsonProperty('updated_at')
  updatedAt: string = new Date().toISOString();
  @JsonProperty('score_negative')
  scoreNegative: number = 0;
  @JsonProperty('score_positive')
  scorePositive: number = 0;
  @JsonProperty('owner_id')
  ownerId: string | undefined = undefined;
  @JsonProperty('user_id')
  userId: string | undefined = undefined;
  @JsonProperty('happen_id')
  happenId: string | undefined = undefined;
  @JsonProperty('name_id')
  nameId: string | undefined = undefined;
  nickname: string = '';
  text: string = '';
  sentiment: string = '';
}

export class HappenCommentHttpResponse extends HttpResponseDefault<Array<HappenComment>> {
  @JsonProperty({ clazz: HappenComment })
  public override data: Array<HappenComment> = [];
}

export class HappenCommentSingleTon extends HttpResponseDefault<HappenComment> {
  @JsonProperty({ clazz: HappenComment })
  public override data: HappenComment= new HappenComment()
}