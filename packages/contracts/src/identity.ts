export interface LoginRequest {
  email: string;
  password: string;
}

export interface AccountDto {
  id: string;
  email: string;
  name: string | null;
  roles: string[];
  permissions: string[];
}

export interface LoginResponse {
  token: string;
  account: AccountDto;
}
