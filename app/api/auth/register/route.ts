import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

export const POST = async (req: NextRequest) => {
    try {
        const { email, password } = await req.json();
        if (!email || !password) {
            return NextResponse.json(
                { error: "Please provide email and password" },
                { status: 400 }
            )
        }
        await connectToDatabase();
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "Email is already registered" },
                { status: 400 }
            )
        }
        await User.create({ email, password });
        return NextResponse.json({ message: "User registered successfully" },{status: 201});
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to register User Successfully" }, { status: 500 });
    }
}