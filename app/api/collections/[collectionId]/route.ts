import Admin from "@/lib/models/Admin";
import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } },
  res: NextResponse
) => {
  try {
    await connectToDB();
    const collection = await Collection.findById(params.collectionId).populate({
      path: "products",
      model: Product,
    });

    if (!collection) {
      return new NextResponse(
        JSON.stringify({ message: "Internal server error" }),
        { status: 500 }
      );
    }

    return NextResponse.json(collection, { status: 200 });
  } catch (error) {
    console.log("[Collections-Delete]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } },
  res: NextResponse
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const admin = await Admin.find({ clerkId: userId });
    if (admin[0]?.role !== "super_admin") {
      return new NextResponse("You are not allowed to do this operation", {
        status: 401,
      });
    }

    let collection = await Collection.findById(params.collectionId);

    if (!collection) {
      return new NextResponse("Collection not found", { status: 404 });
    }

    const { title, image, description } = await req.json();

    if (!title || !image) {
      return new NextResponse("Title and image are required", { status: 500 });
    }

    collection = await Collection.findByIdAndUpdate(
      params.collectionId,
      { title, image, description },
      { new: true }
    );

    await collection.save();

    return NextResponse.json(collection, { status: 200 });
  } catch (error) {
    console.log("[Collections-Update]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } },
  res: NextResponse
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const admin = await Admin.find({ clerkId: userId });
    if (admin[0]?.role !== "super_admin") {
      return new NextResponse("You are not allowed to do this operation", {
        status: 401,
      });
    }

    await Collection.findByIdAndDelete(params.collectionId);

    await Product.updateMany(
      { collections: params.collectionId },
      { $pull: { collections: params.collectionId } }
    );

    return new NextResponse("Collection is deleted", { status: 200 });
  } catch (error) {
    console.log("[Collections-Delete]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
