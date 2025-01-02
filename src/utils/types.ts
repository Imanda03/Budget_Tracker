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

export interface CategoryFormData {
  id?: string;
  title: string;
  icon: string;
  type: 'income' | 'expense';
}

export type transactionData = {
  title: string;
  categoryId: string;
  date: Date;
  description: string;
  type: 'income' | 'expense';
  price: string;
};

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  categoryId: {
    title: string;
    icon: string;
  };
  price: number;
  date: string;
  description: string;
  title: string;
}

export type userPayload = {
  userDetails: currentUserPayload;
};

export type currentUserPayload = {
  fullName: string;
  address: string;
  email: string;
  phoneNumber: number;
};
