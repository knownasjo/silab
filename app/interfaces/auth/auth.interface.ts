export interface ILoginRequestBody {
  nim: string;
  password: string;
}

export interface ILoginResponseBody {
  accessToken: string;
  refreshToken: string;
}

export interface IMeResponseBody {
  id: string;
  name: string;
  email: string;
  nim: string;
  role: string;
}

export interface IChangePasswordRequestBody {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}
