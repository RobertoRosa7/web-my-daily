//paths do frotend
export enum RoutePaths {
  register = '/auth/register',
  login = '/auth/login',
  home = '/home',
}

//paths do backend
export enum Paths {
  pathPostSignup = '/ms-users/auth',
  pathPostSignin = '/ms-users/auth/login',
  pathGetProfile = '/ms-users/user/profile',
  pathPutUserChangeNickname = '/ms-users/user/profile/change-nickname',
  pathGetSearch = '/ms-users/public/user/search?name={domainName}',
  pathGetprofilePublic = '/ms-users/public/user',
  pathPostUserFollow = '/ms-users/follows',
  pathPostLiked = '/ms-users/user/likes/like',
  pathPostDisliked = '/ms-users/user/likes/dislike',

  pathPostStoppingViewing = '/ms-daily/happen/user/stop-viewing',
  pathGetTimeline = '/ms-daily/happen/user/timelines',
  pathGetComments = '/ms-daily/happen/comments/find',
  pathPostComment = '/ms-daily/happen/comments',
  pathGetHappen = '/ms-daily/happen/user',
  pathDelHappen = '/ms-daily/happen',
  pathPutHappen = '/ms-daily/happen',
  pathPostHappen = '/ms-daily/happen',
}

export enum HappenPublicStatus {
  public = 'PUBLIC',
  private = 'PRIVATE',
  followers = 'FOLLOWERS',
}

export enum FollowingStatus {
  following = 'FOLLOWING',
  requested = 'REQUESTED',
  cancelRequest = 'CANCEL_REQUEST',
  rejected = 'REJECTED',
  private = 'PRIVATE',
  public = 'PUBLIC',
}

export enum FieldName {
  nameId = 'nameId',
  nickname = 'nickname',
  email = 'email',
  password = 'password',
  confirmPassword = 'confirmPassword',
  checkTerms = 'checkTerms',
}
export enum Common {
  daily = '@daily',
}

export enum TimeAgoMessages {
  YEARS = 'há {time} ano(s)',
  WEEKS = 'há {time} semana(s)',
  DAYS = 'há {time} dia(s)',
  HOURS = 'há {time} hora(s)',
  MINUTES = 'há {time} minuto(s)',
  NOW = 'agora mesmo',
}
