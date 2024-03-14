import { connectDB, generateForgetToken, sendMail, UserModel } from "@/lib";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

connectDB();
export const POST = async (req: NextRequest) => {
  const { email } = await req.json();

  const existUser = await UserModel.findOne({
    email,
  });

  if (!existUser) {
    return NextResponse.json(
      {
        error: "No exist user with this email",
        message: null,
      },
      {
        status: 400,
      }
    );
  }

  const token = generateForgetToken(existUser._id, email);
  await sendMail(existUser.name, token, email);

  const response = NextResponse.json(
    {
      error: null,
      message: "Reset password link sent to your email",
    },
    {
      status: 200,
    }
  );

  response.cookies.set("forget-token", token, {
    httpOnly: true,
    secure: true,
  });

  return response;
};
