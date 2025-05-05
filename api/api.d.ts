////////////////////////////////////////////////////////////////

type SignUpRequest = {
  email: string;
  password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
  birthday: string;
  gender: string;
};

type SignUpResponse = {
  email: string;
  first_name: string;
  last_name: string;
  birthday: string;
  gender: string;
  confirmationToken: string;
  role: string;
  isActive: boolean;
  id: number;
  createdAt: string;
  updatedAt: string;
};

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

type ForgotPasswordRequest = {
  email: string;
};

type ForgotPasswordResponse = {
  message: string;
};

type ResetPasswordRequest = {
  token: string;
  newPassword: string;
};

type ResetPasswordResponse = {
  message: string;
};

type RefreshTokenRequest = {
  refreshToken: string;
};

type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};
type RestfulApiError = {
  error?: string;
  message?: string;
  statusCode?: number;
};

type UserResponse = {
  title: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  emailConfirmed: boolean;
  mobileNumber: string;
  address: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    postCode: string;
    country: string | null;
  };
  dateOfBirth: string; // ISO 8601 format
  dateCreated: string;
  dateLastLoggedIn: string;
  canRequestCard: boolean;
};

interface UserProfile {
  business?: any;
  address: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    country: string | null;
    postCode: string;
  };
  canRequestCard: boolean;
  dateCreated: string; // ISO date string
  dateLastLoggedIn: string; // ISO date string
  dateOfBirth: string; // ISO date string
  email: string;
  emailConfirmed: boolean;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  title: string;
  userName: string;
}

type PinResponse = {
  pin: string;
};

type CardDetailInfo = {
  cardholderName: string;
  cardNumber: string;
  expiryDate: string; // ISO 8601 format, e.g., "2028-02-29T00:00:00"
};

type ListTransactionRequest = {
  cursor: string;
  take: string;
  search: string;
};

type Transaction = {
  id: number;
  date: string; // ISO 8601 timestamp
  type: string; // extend if more types are possible
  source: string;
  amount: number;
};

type ListTransactionResponse = {
  data: Transaction[];
  currentPage: number;
  hasNextPage: boolean;
};
