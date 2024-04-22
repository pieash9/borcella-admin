import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } },
  res: NextResponse
) => {
  try {
    await connectToDB();
    const product = await Product.findById(params.productId).populate({
      path: "collections",
      model: Collection,
    });

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 500 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log("[product-GET]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { productId: string } },
  res: NextResponse
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    let product = await Product.findById(params.productId);

    if (!product) {
      return new NextResponse("product not found", { status: 404 });
    }

    const { title, image, description } = await req.json();

    if (!title || !image) {
      return new NextResponse("Title and image are required", { status: 500 });
    }

    product = await Product.findByIdAndUpdate(
      params.productId,
      { title, image, description },
      { new: true }
    );

    await product.save();

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log("[product-Update]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { productId: string } },
  res: NextResponse
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    await Product.findByIdAndDelete(params.productId);

    return new NextResponse("product is deleted", { status: 200 });
  } catch (error) {
    console.log("[products-Delete]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
