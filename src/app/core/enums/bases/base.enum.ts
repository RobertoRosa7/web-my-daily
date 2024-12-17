//paths do frotend
export enum RoutePathsEnum {
  // auth - (user not logged)
  routeRegister = '/auth/register',
  routeLogin = '/auth/login',
  routeTerms = '/auth/terms-conditions',
  routePolicy = '/auth/privacy-policy',
  routeResetPass = '/auth/reset-password',
  routeCreatePass = '/auth/create-new-password',

  // home
  routeHome = '/home',
  routeHomeInit = '/home/initial',

  // public area - (user not looged)
  routePublicArea = '/public',
  routeProDetail = '/public/details',

  // profile private area - (user logged)
  routeProUser = '/profile/user',
  routeProSettings = '/profile/settings',
  routeUserInfo = '/profile/settings/account/resume-user-info',
  routeChangeDomain = '/profile/settings/account/change-domain-name',
  routeChangeName = '/profile/settings/account/change-name',
}

// resources files
export enum PathResources {
  imgSourceHome = 'assets/img/user-profile.png',
  imgSourceLoged = 'assets/img/home-logged.png',
  imgSourceAvatar = 'assets/img/avatar.png',
}

//paths do backend
export enum PathsEnum {
  // ms-users - management service of users
  pathPostSignup = '/ms-users/auth',
  pathPostSignin = '/ms-users/auth/login',
  pathGetProfile = '/ms-users/user/profile',
  pathPutUserChangeNickname = '/ms-users/user/profile/change-nickname',
  pathPutUserChangeNameId = '/ms-users/user/profile/change-name-id',
  pathGetSearch = '/ms-users/public/user/search?name={domainName}',
  pathGetprofilePublic = '/ms-users/public/user',
  pathPostUserFollow = '/ms-users/follows',
  pathPostLiked = '/ms-users/user/likes/like',
  pathPostDisliked = '/ms-users/user/likes/dislike',
  pathProfileDel = '/ms-users/user/profile?id={id}',
  pathResePassword = '/ms-users/auth/password/reset',
  pathCreatePassword = '/ms-users/auth/password/new?auth={token}',

  // ms-daily - management service of daily - Intelligence Artificial (IA)
  pathPostStoppingViewing = '/ms-daily/happen/user/stop-viewing',
  pathGetTimeline = '/ms-daily/happen/user/timelines',
  pathGetComments = '/ms-daily/happen/comments/find',
  pathPostComment = '/ms-daily/happen/comments',
  pathGetHappen = '/ms-daily/happen/user',
  pathDelHappen = '/ms-daily/happen',
  pathPutHappen = '/ms-daily/happen',
  pathPostHappen = '/ms-daily/happen',
}

// warning no change - is the same value of services
export enum HappenPublicStatusEnum {
  public = 'PUBLIC',
  private = 'PRIVATE',
  followers = 'FOLLOWERS',
}

// warning no change - is the same value of services
export enum FollowingStatusEnum {
  following = 'FOLLOWING',
  requested = 'REQUESTED',
  cancelRequest = 'CANCEL_REQUEST',
  rejected = 'REJECTED',
  private = 'PRIVATE',
  public = 'PUBLIC',
}

// fields in the form
export enum FieldNameEnum {
  nameId = 'nameId',
  nickname = 'nickname',
  email = 'email',
  password = 'password',
  confirmPassword = 'confirmPassword',
  checkTerms = 'checkTerms',
}

// suffix @daily is required to save new user
export enum CommonEnum {
  daily = '@daily',
  codeTag = '<code>$1</code>',
}

// friendly name - show on card explore
export enum TimeAgoMessages {
  YEARS = 'há {time} ano(s)',
  WEEKS = 'há {time} semana(s)',
  DAYS = 'há {time} dia(s)',
  HOURS = 'há {time} hora(s)',
  MINUTES = 'há {time} minuto(s)',
  NOW = 'agora mesmo',
}
