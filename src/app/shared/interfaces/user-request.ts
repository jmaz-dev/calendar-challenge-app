export interface UserRequest {
  email: string;
  password: string;
  name: string;
  lastName: string;
  photo: File;
  isActive: boolean;
}
