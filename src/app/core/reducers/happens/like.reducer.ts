import {
  DisLikeRequest,
  HappenResponsePageable,
  LikeRequest,
  ProfileHappenLike,
} from '../../interfaces/happens/profile.happen.interface';

type States = Partial<HappenResponsePageable>;
type Disliked = { index: number; request: DisLikeRequest };
type Liked = { index: number; request: LikeRequest };
const states: States = {};

const getReferenceArray = (_: States) => [...(_.data || [])];
const updateDataStates = <T>(_: States, data: T) => ({ ..._, data });

export const callbackLikedLocal = (states: States, { index, request }: Liked) => {
  const happens = getReferenceArray(states);
  const likes = new ProfileHappenLike();

  likes.dislikedCount = Math.max(0, happens[index].likes.dislikedCount - 1);
  likes.likedCount = request.isLiked ? happens[index].likes.likedCount + 1 : happens[index].likes.likedCount - 1;
  likes.isLiked = request.isLiked;
  likes.isDisliked = false;
  happens[index] = { ...happens[index], likes };

  return updateDataStates(states, happens);
};

export const callbackDislikedLocal = (states: States, { index, request }: Disliked) => {
  const happens = getReferenceArray(states);
  const likes = new ProfileHappenLike();

  likes.likedCount = Math.max(0, happens[index].likes.likedCount - 1);
  likes.dislikedCount = request.disliked
    ? happens[index].likes.dislikedCount + 1
    : happens[index].likes.dislikedCount - 1;
  likes.isDisliked = request.disliked;
  likes.isLiked = false;
  happens[index] = { ...happens[index], likes };

  return updateDataStates(states, happens);
};
