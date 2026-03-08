import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import * as z from "zod";

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
import { useRegisterMutation } from "../mutations";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function RegisterForm() {
  const navigate = useNavigate();
  const registerMutation = useRegisterMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await registerMutation.mutateAsync(data);
    toast.success("Registration successful");
    navigate("/login");
  }

  return (
    <Card className="mx-auto w-full max-w-[92vw] px-1 py-6 sm:max-w-md md:max-w-lg">
      <CardHeader>
        <CardTitle className="font-bold text-xl">Create Account</CardTitle>
        <CardDescription className="text-md">
          Register a new account to get started
        </CardDescription>
      </CardHeader>

      <CardContent>
        {registerMutation.error && (
          <Alert
            variant="destructive"
            className="mb-4 border-destructive rounded-md"
          >
            <AlertCircle />
            <AlertTitle>{registerMutation.error?.message}</AlertTitle>
          </Alert>
        )}

        <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Name</FieldLabel>

                  <Input
                    {...field}
                    id="name"
                    type="text"
                    placeholder="Enter your name"
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
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>

                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>

                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="Enter password"
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

      <CardFooter className="flex flex-col gap-4">
        <Button
          type="submit"
          form="register-form"
          size="lg"
          className="w-full"
          disabled={registerMutation.isPending}
        >
          CREATE ACCOUNT
          {registerMutation.isPending && <Loader2 className="animate-spin" />}
        </Button>

        <p className="text-sm text-muted-foreground">
          Already have an account?&nbsp;
          <a href="/login" className="underline font-medium text-foreground">
            Sign In
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}
