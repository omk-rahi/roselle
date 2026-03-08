import { delay } from "@/lib/utils";
import {
  type LoginPayload,
  type RegisterPayload,
  type UpdatePasswordPayload,
  type UpdateProfilePayload,
  type User,
} from "./types";

const USERS_STORAGE_KEY = "roselle-users";

type StoredUser = User & {
  password: string;
};

function readUsers(): StoredUser[] {
  const raw = localStorage.getItem(USERS_STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as StoredUser[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

export async function register(payload: RegisterPayload) {
  await delay(800);

  const users = readUsers();
  const userExists = users.some(
    (user) => user.email.toLowerCase() === payload.email.toLowerCase(),
  );

  if (userExists) {
    throw new Error("User with this email already exists");
  }

  users.push(payload);
  writeUsers(users);

  return {
    status: "success",
    message: "Registration successful",
    user: {
      name: payload.name,
      email: payload.email,
    },
  };
}

export async function login(payload: LoginPayload) {
  await delay(800);

  const users = readUsers();

  if (!users.length) {
    throw new Error("User not found");
  }

  const user = users.find(
    (item) => item.email.toLowerCase() === payload.email.toLowerCase(),
  );

  if (!user || user.password !== payload.password) {
    throw new Error("Invalid credentials");
  }

  return {
    status: "success",
    message: "Login successful",
    user: {
      name: user.name,
      email: user.email,
    },
  };
}

export async function getUser(): Promise<User | null> {
  await delay(400);

  const users = readUsers();

  if (!users.length) {
    return null;
  }

  const user = users[0];

  return {
    name: user.name,
    email: user.email,
  };
}

export async function logout() {
  await delay(300);

  return {
    status: "success",
    message: "Logged out",
  };
}

export async function updateProfile(payload: UpdateProfilePayload) {
  await delay(600);

  const users = readUsers();
  const currentIndex = users.findIndex(
    (item) => item.email.toLowerCase() === payload.currentEmail.toLowerCase(),
  );

  if (currentIndex < 0) {
    throw new Error("User not found");
  }

  const targetEmail = payload.email.toLowerCase();
  const emailExists = users.some(
    (item, index) => index !== currentIndex && item.email.toLowerCase() === targetEmail,
  );

  if (emailExists) {
    throw new Error("User with this email already exists");
  }

  users[currentIndex] = {
    ...users[currentIndex],
    name: payload.name,
    email: payload.email,
  };

  writeUsers(users);

  return {
    status: "success",
    message: "Profile updated successfully",
    user: {
      name: users[currentIndex].name,
      email: users[currentIndex].email,
    },
  };
}

export async function updatePassword(payload: UpdatePasswordPayload) {
  await delay(600);

  const users = readUsers();
  const currentIndex = users.findIndex(
    (item) => item.email.toLowerCase() === payload.email.toLowerCase(),
  );

  if (currentIndex < 0) {
    throw new Error("User not found");
  }

  if (users[currentIndex].password !== payload.currentPassword) {
    throw new Error("Current password is incorrect");
  }

  users[currentIndex] = {
    ...users[currentIndex],
    password: payload.newPassword,
  };

  writeUsers(users);

  return {
    status: "success",
    message: "Password updated successfully",
  };
}
