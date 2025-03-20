"use client"
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function LandingPageRedirect() {
  useEffect(()=>{
    redirect("auth/login")
  })
  return(
    <></>
  )

}
