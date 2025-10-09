/* eslint-disable @typescript-eslint/no-explicit-any */
import { verify } from 'jsonwebtoken';

import { SECRET_KEY } from '../config';
// import { NextFunction, Response, Request } from 'express';

const authenticateToken = (token) => {
  try {
    const decoded = verify(token, SECRET_KEY) as { role: string; id: string };
    return decoded;
  } catch (error) {
    return null;
  }
};

export default authenticateToken;
