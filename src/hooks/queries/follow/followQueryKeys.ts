import { FollowQueryParams } from '@/services/apis/types/followAPI';

export const followKeys = {
  all: ['follow'] as const,

  /* 로그인 한 사용자 */
  followers: () => [...followKeys.all, 'followers'] as const,
  followerList: (params: FollowQueryParams) => [...followKeys.followers(), { params }] as const,

  followings: () => [...followKeys.all, 'followings'] as const,
  followingList: (params: FollowQueryParams) => [...followKeys.followings(), { params }] as const,

  user: (userId: number) => [...followKeys.all, 'user', userId] as const,

  /* 타유저 */
  userFollowers: (userId: number) => [...followKeys.user(userId), 'followers'] as const,
  userFollowerList: (userId: number, params: FollowQueryParams) =>
    [...followKeys.userFollowers(userId), { params }] as const,

  userFollowings: (userId: number) => [...followKeys.user(userId), 'followings'] as const,
  userFollowingList: (userId: number, params: FollowQueryParams) =>
    [...followKeys.userFollowings(userId), { params }] as const,
};
