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
  pathGetprofilePublic = '/ms-users/public/user',
  pathPostUserFollow = '/ms-users/follows',
  pathPostLiked = '/ms-users/user/likes/like',
  pathPostDisliked = '/ms-users/user/likes/dislike',

  pathPostStoppingViewing = '/ms-daily/happen/user/stop-viewing',
  pathGetTimeline = '/ms-daily/happen/user/timeline',
  pathGetComments = '/ms-daily/happen/comments/find',
  pathPostComment = '/ms-daily/happen/comments',
  pathGetHappen = '/ms-daily/happen/user',
  pathDelHappen = '/ms-daily/happen',
  pathPutHappen = '/ms-daily/happen',
  pathPostHappen = '/ms-daily/happen',
}

export enum HappenPublicStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  FOLLWERS = 'FOLLOWERS',
}

export enum FollowingStatus {
  FOLLOWING = 'FOLLOWING',
  REQUESTED = 'REQUESTED',
  CANCEL_REQUEST = 'CANCEL_REQUEST',
  REJECTED = 'REJECTED',
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
}
