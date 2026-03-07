import { SignInForm } from "@/components";
import { Suspense } from "react";

const SignInPage = () => {
  return (
    <div className="flex flex-col items-center justify-center size-full">
      <div className="mx-auto size-full flex flex-col items-center justify-center px-4">
        <Suspense fallback={<p className="text-muted-foreground">Loading...</p>}>
          <SignInForm />
        </Suspense>
      </div>
    </div>
  );
};

export default SignInPage;
