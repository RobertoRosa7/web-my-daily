import { createReducer, on } from '@ngrx/store';
import { actionProfileSuccess, actionUserFollowSuccess } from '../actions/profile.action';
import { actionSocketUserMetrics } from '../actions/socketio.action';
import { JsonMapProperties } from '../../../../core/decorators/json.decorator';
import {
  MsUserProfileResponse,
  ProfileResponse,
  TotalFollowsDto,
  User,
  UserProfile,
} from '../interfaces/profile.interface';
import { PageableUser } from '../../../../interface/pageable.interface';
import { actionUserFollowers } from '../actions/user.action';

const states: Partial<ProfileResponse> = {};

export const profileReducer = createReducer(
  states,
  on(actionProfileSuccess, (_, { data, message, error }) => {
    return {
      ..._,
      data,
      message,
      error,
    };
  }),
  on(actionUserFollowSuccess, (states, { followId }) => {
    if (states.data instanceof PageableUser) {
      const index = states.data.content.findIndex(({ id }) => id === followId);
      const pageable = Object.assign(new PageableUser(), states.data);

      const userProfile = Object.assign(new User(), pageable.content[index]);
      userProfile.isFollowing = !userProfile.isFollowing;

      const users = [...pageable.content];
      users[index] = userProfile;

      pageable.content = users;
      return { ...states, data: pageable };
    } else {
      const userProfile = Object.assign(new UserProfile(), states.data);
      userProfile.isFollowing = !userProfile.isFollowing;

      return { ...states, data: userProfile };
    }
  }),

  on(actionSocketUserMetrics, (states, metrics) => {
    if (states.data instanceof UserProfile) {
      const userProfile = Object.assign(new UserProfile(), states.data);
      userProfile.profile = JsonMapProperties.deserialize(MsUserProfileResponse, metrics);
      return { ...states, data: userProfile };
    }
    
    return { ...states };
  }),

  on(actionUserFollowers, (states, folloers) => {
    if (states.data instanceof UserProfile) {
      const userProfile = Object.assign(new UserProfile(), states.data);
      userProfile.follows = folloers.data || new TotalFollowsDto();
      return { ...states, data: userProfile };
    }

    return { ...states };
  })
);
