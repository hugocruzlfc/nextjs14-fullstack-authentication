import { NextResponse } from "next/server";

export const POST = async () => {
  //   return NextResponse.redirect("/login");
  const response = NextResponse.json(
    {
      error: null,
      message: "User logged out successfully",
    },
    {
      status: 200,
    }
  );

  response.cookies.delete("token");

  return response;
};
