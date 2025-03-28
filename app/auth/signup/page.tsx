"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userRegister } from "../../../redux/slices/authSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { AppDispatch } from "../../../redux/store";

interface SignUpForm {
  name: string;
  email: string;
  password: string;
}

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpForm>({
    mode: "onBlur"
  });

  // const handleSignUp = async (data: SignUpForm) => {
  //   setError(null);
  //   try {
  //     const response = await fetch(`http://localhost:5000/api/auth/register`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         name: data.name,
  //         email: data.email,
  //         password: data.password
  //       })
  //     });
  //     const responseData = await response.json();
  //     if (!response.ok)
  //       throw new Error(responseData.message || "SignUp Failed");
  //     console.log("Sign Up Success");
  //     alert(responseData.message);
  //     router.push("/success?type=signup");
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   } catch (err: any) {
  //     console.log(err.message);
  //     setError(err.message);
  //   }
  // };

  const handleSignup = async (data: SignUpForm) => {
    setError(null);
    console.log(data, "register");
    const res = await dispatch(
      userRegister({
        name: data.name,
        email: data.email,
        password: data.password
      })
    );
    if (res.payload.status == 201) {
      router.push("/dashboard/home");
    }
  };

  // const handleplans = ()=>{
  //   router.push("/subscription")
  // }

  return (
    <div className="auth-container">
      <div className="absolute inset-0 bg-[url('/netflix-bg.jpg')] bg-cover bg-center opacity-50 w-[100vw] h-[100vh]"></div>
      <div className="absolute inset-0 bg-overlay"></div>
      <div className="auth-box z-2">
        <h1 className="text-4xl font-bold text-center text-[var(--foreground)] logo-text">
          CineFlow
        </h1>
        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}

        <form
          className="mt-6 flex flex-col"
          onSubmit={handleSubmit(handleSignup)}
        >
          <Input
            type="name"
            placeholder="Name"
            required={true}
            {...register("name", {
              required: "Name is required"
            })}
            className="mt-3 w-full h-[48px] rounded-[4px] border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            style={{ marginLeft: 0, marginTop: "16px" }}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
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
            className="mt-3 w-full h-[48px] rounded-[4px] border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            style={{ marginLeft: 0, marginTop: "16px" }}
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
            className="mt-3 w-full h-[48px] rounded-[4px] border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            style={{ marginLeft: 0, marginTop: "16px" }}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
          <Button
            type="submit"
            className="bg-[var(--foreground)] text-white font-semibold py-3"
            style={{ backgroundColor: "#6E44FF", marginTop: "16px" }}
          >
            Sign Up
          </Button>
        </form>

        <div
          className="mt-4 flex justify-between text-sm text-gray-400"
          style={{ marginTop: "16px" }}
        >
          <Link href="#">Forgot password?</Link>
          <Link
            href="/auth/login"
            className="text-[var(--foreground)]"
            style={{ color: "#6E44FF" }}
          >
            Sign In
          </Link>
        </div>
        {/* <div className="plans">
          <Link href={"/dashboard/subscription"}>
            Click here to check the Plans...
          </Link>
        </div> */}
      </div>
    </div>
  );
}
