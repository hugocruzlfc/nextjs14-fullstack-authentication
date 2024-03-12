import { connectDB, UserModel, verifyToken } from "@/lib";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export const GET = async (req: NextRequest) => {
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

  const existUser = await UserModel.findById(userId).select("-password");

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
      message: "Data fetched successfully",
      user: existUser,
    },
    {
      status: 200,
    }
  );
};
