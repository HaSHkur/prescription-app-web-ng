export interface RegistrationRequest {
  username: string;
  role: Role
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface UserDomain {
  username: string;
  role: string; 
}

export enum Role{
  USER = 'USER',
  ADMIN = 'ADMIN'
}
