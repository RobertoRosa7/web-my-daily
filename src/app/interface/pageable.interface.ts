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

export interface Pageable<T> {
  content?: T;
  pageable?: Page;
  last?: boolean;
  size?: number;
  number?: number;
  sort?: Array<string>;
  numberOfElements?: number;
  first?: boolean;
  empty?: boolean;
  totalPages?: number;
  totalElements?: number;
}

export class PageableGeneral<T> implements Pageable<T> {
  public content: undefined | T = undefined;
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
