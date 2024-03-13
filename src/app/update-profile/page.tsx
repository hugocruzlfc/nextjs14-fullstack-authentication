"use client";
import { NextPage } from "next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { useAuth } from "@/context";
import { catchErrorMessage } from "@/utils";

const Page: NextPage = () => {
  const route = useRouter();
  const { user } = useAuth();
  const validationSchema = Yup.object({
    email: Yup.string().email("Email must valid").required("Email is required"),
    name: Yup.string().required("Name is required"),
  });

  // const initialValues = {
  //   email: "",
  //   name: "",
  // };

  const onSubmit = async (
    values: { email: string; name: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const response = await axios.put("/api/update-profile", values);
      const data = await response.data;
      toast.success(data.message);
      resetForm();
      route.push("/");
    } catch (error) {
      catchErrorMessage(error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-[82vh] flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="min-h-[82vh] w-full flex items-center justify-center">
        <Formik
          validationSchema={validationSchema}
          initialValues={user}
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
            <div className="mb-3">
              <button
                type="submit"
                className="w-full bg-green-500 rounded text-white py-2 px-4 font-bold "
              >
                Update
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Page;
