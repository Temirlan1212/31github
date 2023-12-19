import { NextResponse } from "next/server";
import connectToDb from "@/lib/mongoose";
import Category from "@/lib/models/category.model";
import { getServerMessageKey } from "@/helpers/server-messages";

export async function POST(req: Request) {
  const body = await req.json();

  if (body == null) {
    return new NextResponse(null, { status: 400 });
  }

  try {
    await connectToDb();
    const isCategoryExists = await Category.findOne({ value: body?.value });

    if (isCategoryExists) {
      return new NextResponse(
        JSON.stringify({
          message: "validation failed",
          errors: { value: getServerMessageKey("categoryExists") },
        }),
        { status: 400 }
      );
    }

    const CategoryApi = new Category(body);
    await CategoryApi.save();
    const data = await Category.find();
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

export async function PATCH(req: Request) {
  const body = await req.json();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (body == null || id == null) {
    return new NextResponse(null, { status: 400 });
  }

  try {
    await connectToDb();
    const category = await Category.findOne({ _id: id });
    if (category?.value !== body?.value) {
      const isCategoryExists = await Category.findOne({ value: body?.value });
      if (isCategoryExists) {
        return new NextResponse(
          JSON.stringify({
            message: "validation failed",
            errors: { value: getServerMessageKey("categoryExists") },
          }),
          { status: 400 }
        );
      }
    }

    await Category.findOneAndUpdate({ _id: id }, body);
    const data = await Category.find();
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

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const type = !!id ? "one" : "list";

  try {
    await connectToDb();
    if (type === "one") {
      const data = await Category.findById(id);
      return new NextResponse(JSON.stringify(data), { status: 200 });
    }
    if (type === "list") {
      const data = await Category.find();
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
    await Category.findOneAndDelete({ _id: id });
    const data = await Category.find();
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
