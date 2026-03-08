import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { type AppDispatch, type RootState } from "@/store";
import { logout } from "@/features/auth/authSlice";
import { useLogoutMutation } from "@/features/auth/mutations";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export function AccountOverview() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const logoutMutation = useLogoutMutation();
  const user = useSelector((state: RootState) => state.auth.user);

  const name = user?.name ?? "Roselle Customer";
  const email = user?.email ?? "customer@roselle.com";

  async function handleLogout() {
    try {
      await logoutMutation.mutateAsync();
      dispatch(logout());
      toast.success("Logged out successfully");
      navigate("/login");
    } catch {
      dispatch(logout());
      navigate("/login");
    }
  }

  return (
    <Card className="h-fit order-1 lg:order-2">
      <CardHeader>
        <CardTitle>Account Overview</CardTitle>
        <CardDescription>Your active Roselle account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm">
          <div>
            <p className="text-muted-foreground">Name</p>
            <p className="font-medium">{name}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Email</p>
            <p className="font-medium break-all">{email}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          type="button"
          variant="destructive"
          onClick={handleLogout}
          className="w-full border-0 shadow-none"
          disabled={logoutMutation.isPending}
        >
          Logout
          {logoutMutation.isPending && <Loader2 className="animate-spin" />}
        </Button>
      </CardFooter>
    </Card>
  );
}
