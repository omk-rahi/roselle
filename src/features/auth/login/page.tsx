import { Helmet } from "react-helmet-async";
import { Logo } from "@/components/shared/logo";
import { LoginForm } from "./form";

export default function LoginPage() {
  return (
    <section className="mx-auto flex min-h-[70dvh] w-full max-w-xl flex-col items-center justify-center gap-6 py-6 sm:py-10">
      <Helmet>
        <title>Login | Roselle</title>
      </Helmet>

      <div className="flex justify-center">
        <Logo />
      </div>
      <div className="w-full">
        <LoginForm />
      </div>
    </section>
  );
}
