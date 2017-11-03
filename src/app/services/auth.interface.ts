export interface User extends ApiResponse {
  created_at: string;
  email: string;
  firstname: string;
  google_profile_url: string;
  id: number;
  lastname: string;
  remember_token: string;
  slug: string;
  updated_at: string;
  website_url: string;
}

interface CurrentUserDataApiResponse {
  csrf_token: string;
  session: string;
  user: User;
}

export interface CurrentUserApiResponse extends ApiResponse {
  csrf_token?: string;
  session?: string;
  data?: CurrentUserDataApiResponse;
}

export interface LoginApiResponse extends ApiResponse {
  data?: User;
}

export interface ApiResponse {
  status: 'succcess' | 'error';
  msg?: string;
  data?: any;
}
