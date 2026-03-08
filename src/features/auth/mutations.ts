import { useMutation } from "@tanstack/react-query";
import { login, logout, register, updatePassword, updateProfile } from "./api";
import {
  type LoginPayload,
  type RegisterPayload,
  type UpdatePasswordPayload,
  type UpdateProfilePayload,
} from "./types";

export function useRegisterMutation() {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => register(payload),
  });
}

export function useLoginMutation() {
  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
  });
}

export function useUpdateProfileMutation() {
  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateProfile(payload),
  });
}

export function useUpdatePasswordMutation() {
  return useMutation({
    mutationFn: (payload: UpdatePasswordPayload) => updatePassword(payload),
  });
}

export function useLogoutMutation() {
  return useMutation({
    mutationFn: logout,
  });
}
