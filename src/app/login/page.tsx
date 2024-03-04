"use client";
import { NextPage } from "next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Page: NextPage = () => {
  const validationSchema = Yup.object({
    email: Yup.string().email("Email must valid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be greater than 6 characters")
      .required("Password is required"),
  });
  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center">
        <Formik>
          <Form className="w-1/2 mx-auto">
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full py-2 px-4 ring-2 ring-indigo-400"
                placeholder="Enter your email"
              />
              <ErrorMessage
                name="email"
                component={"p"}
                className="text-red-500"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full py-2 px-4 ring-2 ring-indigo-400"
                placeholder="Enter your password"
              />
              <ErrorMessage
                name="password"
                component={"p"}
                className="text-red-500"
              />
            </div>
            <div className="mb">
              <button className="w-full bg-green-500 rounded text-white py-3">
                Login
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Page;
