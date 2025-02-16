import TabSwitcher from "./components/tab-switcher";
import SignInForm from "./components/sign-in-form";
import SignUpForm from "./components/sign-up-form";
import { redirect } from "next/navigation";
import Navbar from "@/shared/components/layouts/nav-bar";
import { validateServerSession } from "@/shared/utils/security/auth";
import { DEFAULT_REDIRECT_URL } from "@/config/constants/app";

const AuthPage = async () => {
  const user = await validateServerSession();

  if (user) {
    redirect(DEFAULT_REDIRECT_URL);
  }

  return (
    <>
      <Navbar />
      <div className="relative flex w-full h-screen bg-background">
        <div className="max-w-3xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 items-start">
          <TabSwitcher SignInTab={<SignInForm />} SignUpTab={<SignUpForm />} />
        </div>
      </div>
    </>
  );
};

export default AuthPage;
