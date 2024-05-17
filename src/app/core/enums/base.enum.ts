//paths do frotend
export enum RoutePaths {
  register = '/auth/register',
  login = '/auth/login',
  home = '/home',
}

//paths do backend
export enum Paths {
  signup = '/ms-users/auth',
  signin = '/ms-users/auth/login',
  getProfile = '/ms-users/user/profile',
  profilePublic = '/ms-users/public/user',
  userFollow = '/ms-users/follows',

  getHappen = '/ms-daily/happen/user',
  deleteHappen = '/ms-daily/happen',
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
