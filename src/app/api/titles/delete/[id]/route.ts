import Title from "../../../../models/Title"
import { NextResponse, NextRequest } from "next/server";

export async function DELETE(req :NextRequest , { params }: { params: any }) {
    try {
      const { id } = params;
      await Title.findByIdAndDelete(id);
      return NextResponse.json({ message: "Title Deleted" }, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
  }