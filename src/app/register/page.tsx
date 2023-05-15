"use client";
import Link from "next/link";
import { useForm } from "../hooks/useForm";
import axios from "axios";
import { Alert } from "@mui/material";
import { useState } from "react";

const page = () => {
  const { formState, onInputChange } = useForm();
  const [registerFlag, setRegisterFlag] = useState(false);
  const [errorFlag, setErrorFlag] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password }: any = formState;

    await axios
      .post(process.env.NEXT_PUBLIC_API_URL + "/users", {
        name,
        email,
        password,
      })
      .then((resp) => {
        setRegisterFlag(true);
        setErrorFlag(false);        
      })
      .catch((err) => {
        console.log(err)
        setErrorFlag(true);
        setRegisterFlag(false);
      });
  };

  return (
    <main>
      
      <form
        className="flex flex-col gap-2 w-[50%] mx-auto mt-[20vh] form rounded"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-[2rem] font-bold">
          Register a new account 👌
        </h1>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="border p-2 rounded-md text-gray-800"
          onChange={onInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 rounded-md text-gray-800"
          onChange={onInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 rounded-md text-gray-800"
          onChange={onInputChange}
          required
        />
        <button
          type="submit"
          className="p-2 rounded-md bg-purple-600 text-white  hover:bg-purple-700"
        >
          Sign up
        </button>
        <div className="w-[50%] mx-auto mt-5">
          {
            registerFlag 
            ?
            <Alert severity="success" variant="filled">User registered successfully</Alert>          
            :
            errorFlag && <Alert severity="error" variant="filled">Something went wrong when register user</Alert>
          }        
        </div>
        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link
            href="/"
            className="text-purple-600 hover:text-purple-700 underline"
          >
            Login
          </Link>
        </p>
      </form>
    </main>
  );
};

export default page;
