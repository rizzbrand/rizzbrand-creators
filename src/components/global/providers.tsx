"use client";

import React from "react";
// import { ClerkProvider } from "@clerk/nextjs"  // Clerk removed — sign in / sign up commented out

interface Props {
    children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
    return <>{children}</>;
};

export default Providers;
