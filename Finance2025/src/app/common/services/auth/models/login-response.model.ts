export interface LoginResponse {
  id: string;
  email: string;
  name: string;
  token: string;
}

export interface LogoutRequest {
  email: string;
}
