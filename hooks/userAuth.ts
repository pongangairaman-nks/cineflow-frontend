"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();
  const { token } = useSelector((state: RootState) => state.auth);
  console.log("inside useAuth");
  useEffect(() => {
    console.log("inside useAuth useEffect");
    if (!token) router.replace("/auth/login");
  }, [token, router]);

  return token ? true : false;
}
