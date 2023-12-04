import Title from "../../../models/Title";
import { NextResponse } from "next/server";

export async function GET() {

    try {
        const titles = await Title.find();
        return NextResponse.json({ titles });

    } catch (err) {
        console.error("Error fetching titles:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
