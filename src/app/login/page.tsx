"use client";
import { NextPage } from "next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { catchErrorMessage } from "@/utils";

const Page: NextPage = () => {
  const route = useRouter();
  const validationSchema = Yup.object({
    email: Yup.string().email("Email must valid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be greater than 6 characters")
      .required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (
    values: typeof initialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const response = await axios.post("/api/login", values);
      const data = await response.data;
      toast.success(data.message);
      resetForm();
      route.push("/");
    } catch (error) {
      catchErrorMessage(error);
    }
  };

  return (
    <>
      <div className="min-h-[82vh] w-full flex items-center justify-center">
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          <Form className="w-1/2  mx-auto">
            <div className="mb-3 ">
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-full py-2 px-4 ring-2 ring-indigo-400 outline-none border-none"
                placeholder="Enter your email"
              />
              <ErrorMessage
                name="email"
                component={"p"}
                className="text-red-500"
              />
            </div>
            <div className="mb-3 ">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                className="w-full py-2 px-4 ring-2 ring-indigo-400 outline-none border-none"
                placeholder="Enter your password"
              />
              <ErrorMessage
                name="password"
                component={"p"}
                className="text-red-500"
              />
            </div>
            <div className="mb-3">
              <button
                type="submit"
                className="w-full bg-green-500 rounded text-white py-2 px-4 font-bold "
              >
                Login
              </button>
            </div>

            <div className="mb-3">
              <p className="text-center">
                Don't have an account?{" "}
                <Link
                  href={"/register"}
                  className="text-blue-500 underline cursor-pointer hover:text-blue-400"
                >
                  Register
                </Link>
              </p>
            </div>
            <div className="mb-3">
              <p className="text-center">
                Forget
                <Link
                  href={"/forget-password"}
                  className="text-blue-500 underline cursor-pointer hover:text-blue-400 ml-1"
                >
                  Password
                </Link>
              </p>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Page;
