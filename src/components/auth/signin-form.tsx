"use client";

// Sign in commented out (Clerk removed). Full form kept below in comments for when auth is re-enabled.
import Link from "next/link";
import Icons from "../global/icons";

const SignInForm = () => {
    return (
        <div className="flex flex-col text-center w-full">
            <div className="flex justify-center">
                <Link href="/">
                    <Icons.icon className="w-8 h-8" />
                </Link>
            </div>
            <h1 className="text-2xl text-center mt-4">Login to RCA</h1>
            <p className="text-sm text-muted-foreground mt-2">Sign in coming soon.</p>
        </div>
    );
};

export default SignInForm;

/* Original sign-in form (Clerk):
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/types";
... (useSignIn, handleOAuth, handleEmail, handleVerifyCode, full JSX with Google/Apple/email, code verification, etc.)
*/
