import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";

export const GET = async () => {
    try {
        await connectToDatabase();
        const videos = await Video.find({}).sort({ createdAt: -1 }).lean();
        if (!videos || videos.length === 0) {
            return NextResponse.json([], { status: 200 });
        }
        return NextResponse.json(videos, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 });
    }
}

export const POST = async (request: NextRequest) => {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        await connectToDatabase();
        const body: IVideo = await request.json();
        if(!body.title || !body.description || !body.videoUrl || !body.thumbnailUrl){
            return NextResponse.json({ error: "Title, description and videoUrl are required" }, { status: 400 });
        }
        const videoData = {
            ...body,
            controls: body.controls ?? true,
            transformation: {
                height: 1920,
                width: 1080,
                quality: body.transformation?.quality ?? 100,
            }
        }
        const newVideo = await Video.create(videoData);
        return NextResponse.json(newVideo, { status: 201 });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to create a video" }, { status: 500 });
    }
}