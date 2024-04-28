import Admin from "@/lib/models/Admin";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    await connectToDB();

    let admin = await Admin.findOne({ clerkId: userId });

    // When the user sign-in for the 1st, immediately we will create a new user for them
    if (!admin) {
      admin = await Admin.create({ clerkId: userId });
      await admin.save();
    }

    return NextResponse.json(admin, { status: 200 });
  } catch (err) {
    console.log("[admin_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
