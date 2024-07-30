"use client";
import React, { useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import toast, { Toaster } from "react-hot-toast";
import handleSignUp from "@/helpers/handleSignUp";
import { useRouter } from "next/navigation";
// import { IconBrandGoogle } from "@tabler/icons-react";

export function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setBtnDisabled(true);
      if (username.length <= 0 || email.length <= 0 || password.length <= 0) {
        toast.error("Please fill in all the details");
        setBtnDisabled(false);
        return;
      }

      if (password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        setBtnDisabled(false);
        return;
      }

      const user: any = await handleSignUp({ username, email, password });
      setBtnDisabled(false);
      //   console.log("We got user:", user);
      if (user.data.message === "Username already exists") {
        toast.error("Username already exists");
        return;
      }

      if (user.data.message === "Email already exists") {
        toast.error("Email already exists");
        return;
      }

      if (user.data.message === "User Created Successfully") {
        router.push(`/verify/${username}`);
        return;
      }
    } catch (error: any) {
      toast.error("Error:", error.message);
      setBtnDisabled(false);
    }
  };
  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="max-w-md w-full mx-auto flex flex-col justify-center h-screen rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <div className="w-full">
          <h2 className="font-bold text-xl text-center text-neutral-800 dark:text-neutral-200 lg:text-left">
            Create Your Account
          </h2>
        </div>
        <div className="w-full">
          <p className="text-neutral-600 text-sm text-center max-w-sm mt-2 dark:text-neutral-300 lg:text-left">
            Join PocketBridge for seamless productivity
          </p>
        </div>
        <form className="my-8" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="John123"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="someone@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </LabelInputContainer>
          <button
            className={`bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] hover:cursor-pointer ${
              !btnDisabled ? "opacity-100" : "opacity-60"
            }`}
            type="submit"
          >
            Sign up
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

          <div className="flex flex-col space-y-4">
            {/* <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button> */}
          </div>
        </form>
      </div>
    </>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
