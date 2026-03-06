"use client";

// Sign up commented out (Clerk removed). Full form kept below in comments for when auth is re-enabled.
import Link from "next/link";
import Icons from "../global/icons";

const SignUpForm = () => {
    return (
        <div className="flex flex-col text-center w-full">
            <div className="flex justify-center">
                <Link href="/">
                    <Icons.icon className="w-8 h-8" />
                </Link>
            </div>
            <h1 className="text-2xl text-center mt-4">Create your account</h1>
            <p className="text-sm text-muted-foreground mt-2">Sign up coming soon.</p>
        </div>
    );
};

export default SignUpForm;

/* Original sign-up form (Clerk):
import React, { useEffect, useState } from 'react'
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/types";
... (handleOAuth, handleEmail, handleVerifyCode, full JSX, etc.)
*/
