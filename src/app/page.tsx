"use client";

import Link from "next/link";
import { useForm } from "./hooks/useForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Alert, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

export default function Home() {
  const { formState, onInputChange } = useForm();
  const [errorFlag, setErrorFlag] = useState(false);
  const [flag, setFlag] = useState(false);

  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("id");
  }, [])
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFlag(true);
    const { email, password }: any = formState;
    await axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/users/" + email + "/" + password)
      .then((res) => {
        if(res.data.length === 0) {
          setErrorFlag(true);
          setFlag(false);
          return;
        }
        localStorage.setItem("user", res.data[0].name);
        localStorage.setItem("id", res.data[0].id);        
        if (res.data.length > 0) {
          setErrorFlag(false);
          setFlag(false);
          router.push("/menu");
        } else {
          setFlag(false);
          setErrorFlag(true);
        }
      });
  };

  return (
    <div>      
      <form
        className="flex flex-col gap-2 w-[50%] mx-auto mt-[20vh] form rounded"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-[2rem] font-bold">
          Welcome!! Please login 😬
        </h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 rounded-md"
          onChange={onInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 rounded-md"
          onChange={onInputChange}
          required
        />
        <button
          type="submit"
          className="p-2 rounded-md bg-purple-600 text-white  hover:bg-purple-700"
        >
          Login
        </button>
        {errorFlag && (
          <Alert severity="error" variant="filled">
            Email / password incorrect{" "}
          </Alert>
        )}
        {flag && (
          <div className="text-center mt-5">
            <CircularProgress color="secondary" />
          </div>
        )}
        <p className="text-center mt-3">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-purple-600 hover:text-purple-700 underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
