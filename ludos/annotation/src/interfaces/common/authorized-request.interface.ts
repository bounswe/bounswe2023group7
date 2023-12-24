import { Payload } from '../user/payload.interface';
import { Request } from 'express';
export interface AuthorizedRequest extends Request {
  user: Payload;
}
