import Product from "@/lib/modles/Product";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    await connectToDB();

    const {
      title,
      description,
      media,
      category,
      collections,
      colors,
      sizes,
      tags,
      expense,
      price,
    } = await req.json();

    if (!title || !description || !media || !category || !expense || !price) {
      return new NextResponse("Not enough data to create product", {
        status: 400,
      });
    }

    const newProduct = await Product.create({
      title,
      description,
      media,
      category,
      collections,
      colors,
      sizes,
      tags,
      expense,
      price,
    });

    await newProduct.save();
    return NextResponse.json(newProduct, { status: 200 });
  } catch (error) {
    console.log("[Product-POST]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};