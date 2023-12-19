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

// export async function PATCH(req: Request) {
//   const body = await req.json();
//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get("id");

//   if (body == null || id == null) {
//     return new NextResponse(null, { status: 400 });
//   }

//   try {
//     await connectToDb();
//     const response = await ProductModel.findOneAndUpdate({ _id: id }, body);
//     return new NextResponse(JSON.stringify(response), { status: 200 });
//   } catch (error: any) {
//     return new NextResponse(
//       JSON.stringify({
//         message: error.message,
//       }),
//       { status: 500 }
//     );
//   }
// }

export async function GET(req: Request) {
  try {
    await connectToDb();
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
