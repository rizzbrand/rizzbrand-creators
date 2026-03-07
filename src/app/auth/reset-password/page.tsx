import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { Suspense } from "react";

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col items-center justify-center size-full">
      <div className="mx-auto size-full flex flex-col items-center justify-center px-4">
        <Suspense fallback={<p className="text-muted-foreground">Loading...</p>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
