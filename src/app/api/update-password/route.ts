import { connectDB, UserModel, verifyForgetToken } from "@/lib";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export const PUT = async (req: NextRequest) => {
  const { password, email, token, confirmPassword } = await req.json();

  if (password !== confirmPassword) {
    return NextResponse.json(
      {
        error: "Password and confirm password must be same",
        message: null,
      },
      {
        status: 400,
      }
    );
  }

  const auth = token || "";

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

  const { userId } = verifyForgetToken(auth, email);

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

  const existUser = await UserModel.findById(userId);

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

  const hashedPassword = await existUser.updatePassword(password);

  await UserModel.findByIdAndUpdate(userId, {
    $set: { password: hashedPassword },
  });

  return NextResponse.json(
    {
      error: null,
      message: "Password updated successfully",
      user: existUser,
    },
    {
      status: 200,
    }
  );
};
