"use client";
import toast, { Toaster } from "react-hot-toast";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import handleVerify from "@/helpers/handleVerify";
import handleNewCode from "@/helpers/handleNewCode";

const VerifyForm = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [regenerateCode, setRegenerateCode] = useState(false);

  const router = useRouter();
  const params = useParams<{ username: string }>();
  const username = params.username;

  const handleExpiredCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const regenerateCode = await handleNewCode({ username });
      if (regenerateCode?.data.message === "New code has been generated") {
        toast.success("A new code has been sent to your email");
        return;
      }

      toast.error("Couldn't send generate new code");
    } catch (error: any) {
      toast(error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setBtnDisabled(true);

      if (verificationCode.length === 0) {
        toast.error("Please enter verification code");
        setBtnDisabled(false);
        return;
      }

      if (verificationCode.length < 4) {
        toast.error("Verification Code must be of 4 digits");
        setBtnDisabled(false);
        return;
      }

      const verify = await handleVerify({ username, verificationCode });

      if (verify?.data.message === "User does not exist") {
        toast.error("User doesn't exist. Please Sign up first");
        setBtnDisabled(false);
        return;
      }

      if (verify?.data.message === "User already verified") {
        toast.error("User is already verified");
        setBtnDisabled(false);
        return;
      }

      if (verify?.data.message === "Verification code is wrong") {
        toast.error("Invalid Code");
        setBtnDisabled(false);
        return;
      }

      if (
        verify?.data.message ===
        "Confirmation time exceeded. Please generate a new code"
      ) {
        toast.error("Your Code has been Expired");
        setRegenerateCode(true);
        setBtnDisabled(false);
        return;
      }

      setRegenerateCode(false);
      router.push("/auth/signin");
    } catch (error: any) {
      toast.error(error.message);
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
            Verify Yourself
          </h2>
        </div>
        <div className="w-full">
          <p className="text-neutral-600 text-sm text-center max-w-sm mt-2 dark:text-neutral-300 lg:text-left">
            A verification code has been sent to your email
          </p>
        </div>
        <form
          className="my-8"
          onSubmit={regenerateCode ? handleExpiredCode : handleSubmit}
        >
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="verificationCode">Verification Code</Label>
              <Input
                id="verificationCode"
                placeholder="1234"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </LabelInputContainer>
          </div>
          <button
            className={`bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] hover:cursor-pointer ${
              !btnDisabled ? "opacity-100" : "opacity-60"
            }`}
            type="submit"
          >
            {regenerateCode ? "Get a New Code" : "Verify"}
            <BottomGradient />
          </button>
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </form>
      </div>
    </>
  );
};

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

export default VerifyForm;
