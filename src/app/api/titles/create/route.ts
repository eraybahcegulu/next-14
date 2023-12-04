import Title from '../../../models/Title'
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
      const body = await req.json()
      await Title.create(body);
      return NextResponse.json({ message: "Title Created" }, { status: 201 });
    } catch (err) {
      console.log(err);
    }
};