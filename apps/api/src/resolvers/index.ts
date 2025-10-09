import authResolver from './auth';
import userResolver from './users';
import eventResolver from './event';
import eventResultResolver from './eventResult';

export const resolvers = [
  authResolver,
  userResolver,
  eventResolver,
  eventResultResolver,
];
