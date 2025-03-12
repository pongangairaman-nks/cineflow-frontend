"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../redux/slices/authSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "../../../redux/store";

interface LoginForm {
  email: string;
  password: string;
}

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const {
    token,
    status,
    error: authError
  } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<LoginForm>({
    mode: "onBlur"
  });

  const handleLogin = (data: LoginForm) => {
    setError(null);
    try {
      dispatch(loginUser(data));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err.message);
      setError(err.message);
    }
  };

  useEffect(() => {
    if (token) {
      router.push("/success?type=login");
    }
  }, [router, token]);
  return (
    <div className="auth-container">
      <div className="absolute inset-0 bg-[url('/netflix-bg.jpg')] bg-cover bg-center opacity-50 w-[100vw] h-[100vh]"></div>
      <div className="absolute inset-0 bg-overlay"></div>
      <div className="auth-box z-2">
        <h1 className="text-4xl font-bold text-center text-[var(--foreground)]">
          CineFlow
        </h1>
        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}

        <form
          className="mt-6 flex flex-col space-y-4"
          onSubmit={handleSubmit(handleLogin)}
        >
          <Input
            type="email"
            placeholder="Email"
            required={true}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Enter a valid email"
              }
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
          <Input
            type="password"
            placeholder="Password"
            required={true}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
          <Button
            type="submit"
            className="bg-[var(--foreground)] text-white font-semibold py-3"
            disabled={!isValid}
          >
            {status === "loading" ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-4 flex justify-between text-sm text-gray-400">
          <Link href="#">Forgot password?</Link>
          <Link href="/auth/signup" className="text-[var(--foreground)]">
            Sign up now
          </Link>
        </div>
        {/* ✅ Error Message */}
        {authError && (
          <p className="text-red-500 text-sm text-center mt-2">{authError}</p>
        )}
      </div>
    </div>
  );
}
