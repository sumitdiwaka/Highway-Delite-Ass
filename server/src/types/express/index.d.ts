// src/types/express/index.d.ts

import { IUser } from '../../models/User'; // Adjust the path if your User.ts is elsewhere

declare global {
  namespace Express {
    // This merges our IUser interface with the Express User interface
    export interface User extends IUser {}

    export interface Request {
      user?: User;
    }
  }
}