import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import * as z from "zod";

import { type AppDispatch, type RootState } from "@/store";
import { setUser } from "@/features/auth/authSlice";
import { useUpdateProfileMutation } from "@/features/auth/mutations";
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

const detailsSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Enter a valid email address"),
});

type DetailsValues = z.infer<typeof detailsSchema>;

export function ProfileDetails() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const updateProfileMutation = useUpdateProfileMutation();

  const name = user?.name ?? "Roselle Customer";
  const email = user?.email ?? "customer@roselle.com";

  const [isEditingDetails, setIsEditingDetails] = useState(false);

  const detailsForm = useForm<DetailsValues>({
    resolver: zodResolver(detailsSchema),
    defaultValues: {
      name,
      email,
    },
  });

  useEffect(() => {
    detailsForm.reset({ name, email });
  }, [detailsForm, name, email]);

  async function onSubmitDetails(data: DetailsValues) {
    if (!user) {
      return;
    }

    const response = await updateProfileMutation.mutateAsync({
      currentEmail: user.email,
      name: data.name,
      email: data.email,
    });

    dispatch(setUser(response.user));
    detailsForm.reset(response.user);
    setIsEditingDetails(false);
    toast.success(response.message);
  }

  function handleCancelEdit() {
    detailsForm.reset({ name, email });
    setIsEditingDetails(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Details</CardTitle>
        <CardDescription>Edit your name and email address</CardDescription>
      </CardHeader>

      <CardContent>
        {updateProfileMutation.error && (
          <Alert
            variant="destructive"
            className="mb-4 border-destructive rounded-md"
          >
            <AlertCircle />
            <AlertTitle>{updateProfileMutation.error.message}</AlertTitle>
          </Alert>
        )}

        <form
          id="profile-details-form"
          onSubmit={detailsForm.handleSubmit(onSubmitDetails)}
        >
          <FieldGroup className="gap-4">
            <Controller
              name="name"
              control={detailsForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="profile-name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="profile-name"
                    type="text"
                    disabled={!isEditingDetails}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={detailsForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="profile-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="profile-email"
                    type="email"
                    disabled={!isEditingDetails}
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
        {isEditingDetails ? (
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancelEdit}
              className="border-0 shadow-none"
              disabled={updateProfileMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="profile-details-form"
              disabled={updateProfileMutation.isPending}
            >
              Save Changes
              {updateProfileMutation.isPending && (
                <Loader2 className="animate-spin" />
              )}
            </Button>
          </div>
        ) : (
          <Button
            type="button"
            onClick={() => {
              setIsEditingDetails(true);
            }}
          >
            Edit Details
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
