import { createReducer, on } from '@ngrx/store';
import { acSusProfile, acUseFollowSuccess } from '../../actions/profile/profile.action';
import { actionSocketUserMetrics } from '../../actions/socket/socketio.action';
import { JsonMapProperties } from '../../decorators/jsons/json.decorator';
import {
  MsUserProfileResponse,
  ProfileResponse,
  TotalFollowsDto,
  User,
  UserProfile,
} from '../../interfaces/profile/profile.interface';
import { PageableUser } from '../../interfaces/pageables/pageable.interface';
import { acUsFollowers } from '../../actions/user/user.action';
import { FollowRequest, ListeningFollowResponse } from '../../interfaces/follows/follow.interface';
import { actionCoreReset } from '../../actions/resets/reset.action';

type States = Partial<ProfileResponse>;
const states: States = {};

const callbackResetStore = (_: States) => states;
const callbackOnProfileSuccess = (_: States, { data, message, error }: ProfileResponse) => {
  return {
    ..._,
    data,
    message,
    error,
  };
};

const callbackOnProfileMetrics = (states: States, metrics: MsUserProfileResponse) => {
  if (states.data instanceof UserProfile) {
    const userProfile = Object.assign(new UserProfile(), states.data);
    userProfile.profile = JsonMapProperties.deserialize(MsUserProfileResponse, metrics);
    return { ...states, data: userProfile };
  }
  return { ...states };
};

const callbackOnSuccess = (states: States, { followingId, followingStatus }: FollowRequest) => {
  if (states.data instanceof PageableUser) {
    const index = states.data.content.findIndex(({ id }) => id === followingId);
    const pageable = Object.assign(new PageableUser(), states.data);

    const userProfile = Object.assign(new User(), pageable.content[index]);
    userProfile.followingStatus = followingStatus;

    const users = [...pageable.content];
    users[index] = userProfile;

    pageable.content = users;
    return { ...states, data: pageable };
  } else {
    const userProfile = Object.assign(new UserProfile(), states.data);
    userProfile.followingStatus = followingStatus;
    return { ...states, data: userProfile };
  }
};

const callbackOnUserFollowers = (states: States, follwoers: ListeningFollowResponse) => {
  if (states.data instanceof UserProfile) {
    const userProfile = Object.assign(new UserProfile(), states.data);
    userProfile.follows = follwoers.data || new TotalFollowsDto();
    return { ...states, data: userProfile };
  }
  return { ...states };
};

export const profileReducer = createReducer(
  states,
  on(acSusProfile, callbackOnProfileSuccess),
  on(acUseFollowSuccess, callbackOnSuccess),
  on(actionSocketUserMetrics, callbackOnProfileMetrics),
  on(acUsFollowers, callbackOnUserFollowers),
  on(actionCoreReset, callbackResetStore)
);
