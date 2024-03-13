"use client";
import { NextPage } from "next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { catchErrorMessage } from "@/utils";
import axios from "axios";

const Page: NextPage = () => {
  const route = useRouter();
  const validationSchema = yup.object({
    email: yup.string().email("Email must valid").required("Email is required"),
  });

  const initialValues = {
    email: "",
  };

  const onSubmit = async (
    values: typeof initialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const response = await axios.post("/api/forget-password", values);
      const data = await response.data;
      resetForm();
      toast.success(data.message);
      route.push("/login");
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

            <div className="mb-3">
              <button
                type="submit"
                className="w-full bg-green-500 rounded text-white py-2 px-4 font-bold "
              >
                Forget
              </button>
            </div>

            <div className="mb-3">
              <p className="text-center">
                Already Know?
                <Link
                  href={"/login"}
                  className="text-blue-500 underline cursor-pointer hover:text-blue-400 ml-2"
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
