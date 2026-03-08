import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import * as z from "zod";

import { type RootState } from "@/store";
import { useUpdatePasswordMutation } from "@/features/auth/mutations";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, "Current password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm your new password"),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type PasswordValues = z.infer<typeof passwordSchema>;

export function Security() {
  const user = useSelector((state: RootState) => state.auth.user);
  const updatePasswordMutation = useUpdatePasswordMutation();

  const passwordForm = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmitPassword(data: PasswordValues) {
    if (!user) {
      return;
    }

    const response = await updatePasswordMutation.mutateAsync({
      email: user.email,
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });

    passwordForm.reset();
    toast.success(response.message);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security</CardTitle>
        <CardDescription>Change your password</CardDescription>
      </CardHeader>

      <CardContent>
        {updatePasswordMutation.error && (
          <Alert
            variant="destructive"
            className="mb-4 border-destructive rounded-md"
          >
            <AlertCircle />
            <AlertTitle>{updatePasswordMutation.error.message}</AlertTitle>
          </Alert>
        )}

        <form
          id="profile-password-form"
          onSubmit={passwordForm.handleSubmit(onSubmitPassword)}
        >
          <FieldGroup className="gap-4">
            <Controller
              name="currentPassword"
              control={passwordForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="current-password">
                    Current Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="current-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="newPassword"
              control={passwordForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="new-password">New Password</FieldLabel>
                  <Input
                    {...field}
                    id="new-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="confirmPassword"
              control={passwordForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="confirm-password">
                    Confirm New Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="confirm-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex flex-wrap items-center justify-end gap-3">
        <Button
          type="submit"
          form="profile-password-form"
          disabled={updatePasswordMutation.isPending}
        >
          Update Password
          {updatePasswordMutation.isPending && (
            <Loader2 className="animate-spin" />
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
