export interface Credentials {
  phone: string,
  password: string
}

export interface RegisterUser {
  name: string,
  phone: string,
  password: string
}

export interface LoginResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      name: string;
      email: string | null;
      phone: string;
      verified: boolean;
    };
  };
  timestamp: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface OtpRequest {
  email: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface GenericResponse {
  message: string;
  success: boolean;
}