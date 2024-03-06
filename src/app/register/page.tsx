"use client";
import { NextPage } from "next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page: NextPage = () => {
  const route = useRouter();
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Email must valid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be greater than 6 characters")
      .required("Password is required"),
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const onSubmit = (
    values: typeof initialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      toast.success("Login successfully");
      resetForm();
      route.push("/");
    } catch (error) {
      toast.error((error as Error).message);
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
              <label htmlFor="name">Name</label>
              <Field
                type="text"
                id="name"
                name="name"
                className="w-full py-2 px-4 ring-2 ring-indigo-400 outline-none border-none"
                placeholder="Enter your name"
              />
              <ErrorMessage
                name="name"
                component={"p"}
                className="text-red-500"
              />
            </div>
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
                Already have an account?{" "}
                <Link
                  href={"/login"}
                  className="text-blue-500 underline cursor-pointer hover:text-blue-400"
                >
                  Login
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
