import { JsonProperty } from '../core/decorators/json.decorator';
import { User } from '../pages/profile/core/interfaces/profile.interface';

export class Page {
  public pageNumbe!: number;
  public pageSiz!: number;
  public sort!: Array<string>;
  public offset!: number;
  public paged!: boolean;
  public unpaged!: boolean;
}

export interface SingletonOrPageable<T> {
  pageable: T | null | undefined;
  data: T | null | undefined;
}

export class Pageable<T> {
  public content?: T;
  public pageable: undefined | Page = undefined;
  public last: undefined | boolean = undefined;
  public size: undefined | number = undefined;
  public number: undefined | number = undefined;
  public sort: undefined | Array<string> = undefined;
  public numberOfElements: undefined | number = undefined;
  public first: undefined | boolean = undefined;
  public empty: undefined | boolean = undefined;
  public totalPages: undefined | number = undefined;
  public totalElements: undefined | number = undefined;
}

export class PageableUser extends Pageable<Array<User>> {
  @JsonProperty({ clazz: User })
  public override content: Array<User> = [];
}
