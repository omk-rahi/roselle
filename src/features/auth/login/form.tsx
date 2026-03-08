import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import * as z from "zod";
import { AlertCircle, Loader2 } from "lucide-react";

import { type AppDispatch } from "@/store";
import { Alert, AlertTitle } from "@/components/ui/alert";
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

import { Input } from "@/components/ui/input";
import { useLoginMutation } from "../mutations";
import { setUser } from "../authSlice";

const formSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const loginMutation = useLoginMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const response = await loginMutation.mutateAsync(data);

    dispatch(setUser(response.user));

    toast.success("Login successful");

    navigate("/");
  }

  return (
    <Card className="mx-auto w-full max-w-[92vw] px-1 py-6 sm:max-w-md md:max-w-lg">
      <CardHeader>
        <CardTitle className="font-bold text-xl">Sign In</CardTitle>
        <CardDescription className="text-md">
          If you have an account, please sign in
        </CardDescription>
      </CardHeader>

      <CardContent>
        {loginMutation.error && (
          <Alert
            variant="destructive"
            className="mb-4 border-destructive rounded-md"
          >
            <AlertCircle />
            <AlertTitle>{loginMutation.error?.message}</AlertTitle>
          </Alert>
        )}

        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-4">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Your Email</FieldLabel>

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

            <div className="text-right text-sm">
              <a
                href="/forgot-password"
                className="text-destructive hover:underline"
              >
                Forgot Password?
              </a>
            </div>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        <Button
          type="submit"
          form="login-form"
          size="lg"
          className="w-full"
          disabled={loginMutation.isPending}
        >
          LOGIN
          {loginMutation.isPending && <Loader2 className="animate-spin" />}
        </Button>

        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?&nbsp;
          <a href="/register" className="underline font-medium text-foreground">
            Create New
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}
