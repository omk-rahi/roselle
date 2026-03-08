export type User = {
  name: string;
  email: string;
};

export type RegisterPayload = User & {
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type UpdateProfilePayload = {
  currentEmail: string;
  name: string;
  email: string;
};

export type UpdatePasswordPayload = {
  email: string;
  currentPassword: string;
  newPassword: string;
};
