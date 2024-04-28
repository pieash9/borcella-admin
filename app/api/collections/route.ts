import Admin from "@/lib/models/Admin";
import Collection from "@/lib/models/Collection";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { userId } = auth();

    const admin = await Admin.find({ clerkId: userId });
    if (admin[0]?.role !== "super_admin") {
      return new NextResponse("You are not allowed to do this operation", {
        status: 401,
      });
    }

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    await connectToDB();

    const { title, description, image } = await req.json();

    const existingCollection = await Collection.findOne({ title });

    if (existingCollection) {
      return new NextResponse("Collection already exist", { status: 400 });
    }
    if (!title || !image) {
      return new NextResponse("Title and image are required", { status: 400 });
    }

    const newCollection = await Collection.create({
      title,
      description,
      image,
    });

    await newCollection.save();

    return NextResponse.json(newCollection, { status: 200 });
  } catch (error) {
    console.log("[Collections_POST]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    await connectToDB();

    const collections = await Collection.find().sort({ createdAt: "desc" });

    return NextResponse.json(collections, { status: 200 });
  } catch (error) {
    console.log("[Collections_GET]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
export const dynamic = "force-dynamic";
