import { authTypeDefs } from './auth';
import { eventTypeDefs } from './event';
import { eventResultTypeDefs } from './eventResult';
import { userTypeDefs } from './users';

export const typeDefs = [
  authTypeDefs,
  userTypeDefs,
  eventTypeDefs,
  eventResultTypeDefs,
];
