import Title from '../../../../models/Title'
import { NextResponse, NextRequest } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: any }) {
    try {
        const body = await req.json()
        const { id } = params;
        await Title.findByIdAndUpdate(id, body);
        return NextResponse.json({ message: "Title Updated" }, { status: 201 });
    } catch (err) {
        console.log(err);
    }
};