import { connectDB, UserModel } from "@/lib";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

connectDB();
export const POST = async (req: NextRequest) => {
  const { name, email, password } = await req.json();

  const existUser = await UserModel.findOne({
    email,
  });

  if (existUser) {
    return NextResponse.json(
      {
        error: "User already exist",
        message: null,
      },
      {
        status: 400,
      }
    );
  }

  await UserModel.create({
    name,
    email,
    password,
  });

  return NextResponse.json(
    {
      error: null,
      message: "User created successfully",
    },
    {
      status: 201,
    }
  );
};
