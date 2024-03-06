"use client";
import React from "react";
import { Toaster } from "react-hot-toast";
import { CiLock } from "react-icons/ci";
import Link from "next/link";

export const Navbar: React.FC = () => {
  return (
    <>
      <Toaster />
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
          <button className="inline-flex items-center bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-700 rounded text-white mt-4 md:mt-0">
            Logout
          </button>
        </div>
      </header>
    </>
  );
};
