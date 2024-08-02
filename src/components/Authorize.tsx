"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { authorizedWithPocket } from "@/store/userSlice";

const Authorize = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  const username = useSelector((state: any) => state.user.username);

  const authorizeUser = async () => {
    try {
      const requestToken = localStorage.getItem("pocketRequestToken");

      if (!requestToken) {
        return;
      }

      const response = await axios.post("/api/pocket-auth-user", {
        requestToken,
      });

      if (response.data.message) {
        setLoading(false);
        dispatch(authorizedWithPocket());
        router.replace(`/dashboard/${username}`);
      }
    } catch (error) {
      toast.error("Authorization Failed. Please try after some time");
    }
  };

  useEffect(() => {
    authorizeUser();
  }, []);

  return (
    <div>
      <Toaster />
      <div className="h-screen flex flex-col justify-center items-center">
        <h3 className="text-2xl font-bold mb-2">Authorizing Pocket</h3>
        <p className="text-sm mb-4">
          You&apos;ll be redirected back shortly...
        </p>
        <SyncLoader
          color="#ffffff"
          loading={loading}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
};

export default Authorize;
