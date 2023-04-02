"use client";

import { AuthStatusUnauthorizeAction } from "@/contexts/authStatus/AuthStatusAction";
import { useAuthStatus } from "@/contexts/authStatus/AuthStatusContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function SignOutButton() {
  const {state, updateAuthStatus} = useAuthStatus();

  const router = useRouter();

  const signOut = ()=>{
    if(updateAuthStatus===undefined)return 
    updateAuthStatus(new AuthStatusUnauthorizeAction())
  }
  
  return (
    <>
    
    {state instanceOf AuthStatusAuthorized ? (
       <button onClick={()=>updateAuthStatus(new AuthStatusUnAuthorizeAction())}>Sign Out</button>
    ):()}
    
      {/* {state instanceOf AuthStatusAuthorized ? (
       
      ) : (
        <Link href="/auth/login">Login</Link>
      )} */}
    </>
  );
}
