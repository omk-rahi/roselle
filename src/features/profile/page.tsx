import { Helmet } from "react-helmet-async";
import { AccountOverview } from "./components/account-overview";
import { ProfileDetails } from "./components/profile-details";
import { Security } from "./components/security";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <Helmet>
        <title>Profile | Roselle</title>
      </Helmet>

      <h1>My Profile</h1>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6 order-2 lg:order-1">
          <ProfileDetails />
          <Security />
        </div>
        <AccountOverview />
      </div>
    </div>
  );
}
