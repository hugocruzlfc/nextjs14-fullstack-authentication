"use client";
import React from "react";
import toast from "react-hot-toast";
import { CiLock } from "react-icons/ci";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Navbar: React.FC = () => {
  const router = useRouter();
  const logoutHandler = () => {
    try {
      toast.success("Logout successfully");
      router.push("/login");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };
  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            href={"/"}
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 "
          >
            <CiLock size={40} />
            <span className="ml-3 text-xl">Authentication</span>
          </Link>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link
              href={"/"}
              className="mr-5 hover:text-gray-900"
            >
              Home
            </Link>
            <Link
              href={"/login"}
              className="mr-5 hover:text-gray-900"
            >
              Login
            </Link>
            <Link
              href={"/register"}
              className="mr-5 hover:text-gray-900"
            >
              Register
            </Link>
          </nav>
          <button
            onClick={logoutHandler}
            className="inline-flex items-center bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-700 rounded text-white mt-4 md:mt-0"
          >
            Logout
          </button>
        </div>
      </header>
    </>
  );
};
