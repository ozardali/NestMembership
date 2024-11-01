import { User } from '../users/user.entity';

declare namespace Express {
  export interface Request {
    user?: Partial<User>;
  }
}
