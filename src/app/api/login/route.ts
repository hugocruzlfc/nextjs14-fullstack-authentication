import { connectDB, generateToken, UserModel } from "@/lib";
import { NextResponse } from "next/server";

connectDB();
export const POST = async (req: Request, res: Response) => {
  const { email, password } = await req.json();

  const existUser = await UserModel.findOne({
    email,
  });

  if (!existUser) {
    return NextResponse.json(
      {
        error: "User not exist",
        message: null,
      },
      {
        status: 401,
      }
    );
  }

  const isMatch = await existUser.confirmPassword(password);

  if (!isMatch) {
    return NextResponse.json(
      {
        error: "Invalid credentials",
        message: null,
      },
      {
        status: 400,
      }
    );
  }

  const token = generateToken(existUser._id);

  const response = NextResponse.json(
    {
      error: null,
      message: "Login successfully!",
    },
    {
      status: 200,
    }
  );

  response.cookies.set("token", token, {
    httpOnly: true,
    secure: true,
  });

  return response;
};
