export interface AuthResponse {
  needsProfile: boolean;
  token: string;
  userId: string;
  error: Object;
}
