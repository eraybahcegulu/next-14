import Title from "../../../../models/Title"
import { NextResponse, NextRequest } from "next/server";

export async function GET(req :NextRequest , { params }: { params: any }) {
    try {
      const { id } = params;
      const title = await Title.findById(id);
      return NextResponse.json({ title });
    } catch (error) {
      console.log(error);
    }
  }