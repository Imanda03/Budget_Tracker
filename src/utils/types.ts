export interface userDataProps {
  fullName: string;
  address: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface loginData {
  email: string;
  password: string;
}

export interface ApiError {
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}
