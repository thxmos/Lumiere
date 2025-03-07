import { Suspense } from "react";
import ResetPasswordForm from "./reset-password-form";
import Navbar from "@/shared/components/layouts/nav-header/nav-bar";

export default function ResetPasswordPage() {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen">
        <Suspense fallback={<div>Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </>
  );
}
