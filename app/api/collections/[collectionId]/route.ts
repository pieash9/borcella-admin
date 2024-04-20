import Collection from "@/lib/modles/Collection";
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
    const collection = await Collection.findById(params.collectionId);

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

    await Collection.findByIdAndDelete(params.collectionId);

    return new NextResponse("Collection is deleted", { status: 200 });
  } catch (error) {
    console.log("[Collections-Delete]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
