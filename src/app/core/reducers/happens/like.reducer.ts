import {
  DisLikeRequest,
  HappenResponsePageable,
  LikeRequest,
  LikeResponse,
  LikeSocketio,
  ProfileHappen,
  ProfileHappenLike,
} from '../../interfaces/happens/profile.happen.interface';

type States = Partial<HappenResponsePageable>;
type Disliked = { index: number; request: DisLikeRequest };
type Liked = { index: number; request: LikeRequest };
const states: States = {};

const getReferenceArray = (_: States) => [...(_.data || [])];
const updateStates = (_: States, data: Array<ProfileHappen>, happenActive: ProfileHappen) => ({
  ...states,
  data,
  happenActive,
});

export const callbackLikedLocal = (states: States, { index, request }: Liked) => {
  const happens = getReferenceArray(states);
  const likes = Object.assign(new ProfileHappenLike(), {
    ...happens[index].likes,
    isLiked: request.isLiked,
    isDisliked: false,
  });

  happens[index] = { ...happens[index], likes };
  return updateStates(states, happens, { ...happens[index], likes });
};

export const callbackDislikedLocal = (states: States, { index, request }: Disliked) => {
  const happens = getReferenceArray(states);
  const likes = Object.assign(new ProfileHappenLike(), {
    ...happens[index].likes,
    isDisliked: request.disliked,
    isLiked: false,
  });

  happens[index] = { ...happens[index], likes };
  return updateStates(states, happens, { ...happens[index], likes });
};

export const callbackUpdateLikeSocketio = (states: States, { data, happenId }: LikeSocketio) => {
  const happens = getReferenceArray(states);
  const index = happens.findIndex((h) => h.id === happenId);

  const likes = Object.assign(new ProfileHappenLike(), {
    ...happens[index].likes,
    dislikedCount: data.dislikedCount,
    likedCount: data.likedCount,
  });

  happens[index] = { ...happens[index], likes };
  return updateStates(states, happens, { ...happens[index], likes });
};

export const callbackLikeSuccess = (states: States, { happenId, dislikedCount, likedCount }: LikeResponse) => {
  const happens = getReferenceArray(states);
  const index = happens.findIndex((h) => h.id === happenId);
  const likes = Object.assign(new ProfileHappenLike(), { ...happens[index].likes, dislikedCount, likedCount });

  happens[index] = { ...happens[index], likes };

  return updateStates(states, happens, { ...happens[index], likes });
};
