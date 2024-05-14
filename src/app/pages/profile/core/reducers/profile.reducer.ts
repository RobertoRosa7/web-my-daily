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
import { ListeningFollowResponse } from '../../../../interface/follow.interface';

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
    let pageable = new PageableUser();
    let userProfile = new User();

    if (states.data instanceof PageableUser) {
      const index = states.data.content.findIndex(({ id }) => id === followId);

      pageable = Object.assign(pageable, states.data);
      userProfile = Object.assign(userProfile, pageable.content[index]);
      userProfile.isFollowing = true;

      const users = [...pageable.content];
      users[index] = userProfile;

      pageable.content = users;
    }

    return {
      ...states,
      data: pageable,
    };
  }),

  on(actionSocketUserMetrics, (states, metrics) => {
    let userProfile = new UserProfile();

    if (states.data instanceof UserProfile) {
      userProfile = Object.assign(userProfile, states.data);
      userProfile.profile = JsonMapProperties.deserialize(MsUserProfileResponse, metrics);
    }

    return {
      ...states,
      data: userProfile,
    };
  }),

  on(actionUserFollowers, (states, folloers) => {
    let userProfile = new UserProfile();

    if (states.data instanceof UserProfile) {
      userProfile = Object.assign(userProfile, states.data);
      userProfile.follows = folloers.data || new TotalFollowsDto();
      return {
        ...states,
        data: userProfile,
      };
    } else {
      return {
        ...states,
      };
    }
  })
);
