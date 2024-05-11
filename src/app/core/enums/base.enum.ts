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

  getHappen = '/ms-daily/happen/user',
}

export enum HappenPublicStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  FOLLWERS = 'FOLLOWERS',
}
