export const userKeys = {
  all: ['user'] as const,
  me: () => [...userKeys.all, 'me'] as const,
  auth: () => [...userKeys.all, 'auth'] as const,
  otherUser: (userId: number) => [...userKeys.all, 'other', userId] as const,
};
