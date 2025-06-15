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

type VerificationCodeResponse = {
  devVerificationCode: string;
};

type Metadata = {
  [key: string]: {
    nullable: boolean;
  };
};

interface IReason {
  message: string;
  metadata: Metadata;
}

interface IError {
  message: string;
  metadata: Metadata;
  reasons: {
    value: IError; // Circular reference
  }[];
}

interface UserValue {
  email: string;
  mobileNumber: string;
  dateOfBirth: string; // ISO 8601 datetime string
  business: {
    name: string;
  };
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  country: string;
  postcode: string;
}

interface SettingProfileResponse {
  isFailed: boolean;
  isSuccess: boolean;
  reasons: IReason[];
  errors: IError[];
  successes: IReason[];
  valueOrDefault: UserValue;
  value: UserValue;
}
interface UserCardInfo {
  cardBalance: number;
  cardStatus: number;
  cardholderId: number;
  dateCreated: string; // ISO datetime string
  dateLastLoggedIn: string; // ISO datetime string
  deliveryType: string; // e.g., "PC"
  email: string;
  firstName: string;
  hasIssuedCard: boolean;
  last4Digits: string;
  lastName: string;
  pointsBalance: number;
  publicToken: string;
  userId: number;
  userStatus: number;
}

type ChangePhoneNumberRequest = {
  email: string;
  mobileNumber: string;
  dateOfBirth: string; // ISO 8601 datetime string
  business: {
    name: string;
  };
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  country: string | null;
  postcode: string;
  verificationCode: string;
};

type ChangeHomeAddressRequest = {
  addressLine1?: string;
  addressLine2?: string;
  business?: {
    name: string;
  };
  city?: string;
  country?: string | null;
  dateOfBirth?: string; // ISO 8601 datetime string
  email?: string;
  firstName?: string;
  lastName?: string;
  mobileNumber?: string;
  postcode?: string;
};

type RequestCardInfo = {
  addressLine1?: string;
  addressLine2?: string;
  postcode?: string;
  city?: string;
};

type GenerateFileResponse = {
  fileContents: string; // base64-encoded file content
  contentType: string; // MIME type, e.g., "application/pdf"
  fileDownloadName: string;
  lastModified: string | null;
  entityTag: string | null;
  enableRangeProcessing: boolean;
};

type StatementProps = {
  month: string;
  year: string;
};

type UserCardHolder = {
  name: string;
  id: number;
  email: string;
  status: number;
};

type LoadCardRequest = {
  pointsAmount: string;
  type?: string;
};

type SendPointRequest = {
  pointsAmount: string;
  destinationUserId: number;
  type?: string;
};
