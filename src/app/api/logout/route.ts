import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const auth = req.cookies.delete("token");

  //   return NextResponse.redirect("/login");
  return NextResponse.json(
    {
      error: null,
      message: "User logged out successfully",
    },
    {
      status: 200,
    }
  );
};
