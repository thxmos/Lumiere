import TabSwitcher from "./_components/tab-switcher";
import SignInForm from "./_components/sign-in-form";
import SignUpForm from "./_components/sign-up-form";
import { redirect } from "next/navigation";
import { getUser } from "@/actions/session.actions";

const AuthPage = async () => {
  const { user } = await getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="relative flex w-full h-screen bg-background">
      <div className="max-w-3xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 items-start">
        <TabSwitcher SignInTab={<SignInForm />} SignUpTab={<SignUpForm />} />
      </div>
    </div>
  );
};

export default AuthPage;
