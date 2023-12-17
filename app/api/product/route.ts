import { NextResponse } from "next/server";
import connectToDb from "@/lib/mongoose";
import Product from "@/lib/models/product.model";

export async function POST(req: Request) {
  const body = await req.json();

  if (body == null) {
    return new NextResponse(null, { status: 400 });
  }

  try {
    await connectToDb();
    const ProductApi = new Product(body);
    const response = await ProductApi.save();

    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (body == null || id == null) {
    return new NextResponse(null, { status: 400 });
  }

  try {
    await connectToDb();
    const response = await Product.findOneAndUpdate({ _id: id }, body);
    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const type = !!id ? "one" : "list";

  try {
    await connectToDb();
    if (type === "one") {
      const data = await Product.findById(id);
      return new NextResponse(JSON.stringify(data), { status: 200 });
    }
    if (type === "list") {
      const data = await Product.find();
      return new NextResponse(JSON.stringify(data), { status: 200 });
    }
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id == null) return new NextResponse(null, { status: 400 });

  try {
    await connectToDb();
    const data = await Product.findOneAndDelete({ _id: id });
    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
