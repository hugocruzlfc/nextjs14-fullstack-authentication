import { connectDB, UserModel, verifyToken } from "@/lib";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export const PUT = async (req: NextRequest) => {
  const { name, email } = await req.json();

  const auth = req.cookies.get("token") || "";

  if (!auth) {
    return NextResponse.json(
      {
        msg: null,
        error: "Please login first",
      },
      {
        status: 401,
      }
    );
  }

  const { userId } = verifyToken(auth.value);

  if (!userId) {
    return NextResponse.json(
      {
        msg: null,
        error: "Invalid token",
      },
      {
        status: 401,
      }
    );
  }

  const existUser = await UserModel.findByIdAndUpdate(userId, {
    $set: { name, email },
  });

  if (!existUser) {
    return NextResponse.json(
      {
        error: "User not found",
        message: null,
      },
      {
        status: 401,
      }
    );
  }

  return NextResponse.json(
    {
      error: null,
      message: "Data updated successfully",
      user: existUser,
    },
    {
      status: 200,
    }
  );
};
