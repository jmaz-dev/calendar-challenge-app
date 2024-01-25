import { UserResponse } from './user-response';

export interface EventResponse {
  user: UserResponse;
  description: string;
  startDate: Date;
  endDate: Date;
  _id: string;
}
