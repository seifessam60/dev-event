import { Event } from "@/database";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const formData = await req.formData();
    try {
      const event = Object.fromEntries(formData.entries());
      const file = formData.get("image") as File;
      if (!file) {
        return NextResponse.json(
          { message: "No image file found" },
          { status: 400 }
        );
      }
      let tags = JSON.parse(formData.get("tags") as string);
      let agenda = JSON.parse(formData.get("agenda") as string);
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { resource_type: "image", folder: "DevEvents" },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          )
          .end(buffer);
      });
      event.image = (uploadResult as { secure_url: string }).secure_url;
      const createdEvent = await Event.create({ ...event, tags, agenda });
      return NextResponse.json(
        {
          message: "Event created successfully",
          event: createdEvent,
        },
        { status: 201 }
      );
    } catch (error) {
      console.error("Error parsing form data:", error);
      return NextResponse.json(
        {
          message: "Invalid form data",
          error: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error handling POST /api/events request:", error);
    return NextResponse.json(
      {
        message: "Event creation failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find().sort({ createdAt: -1 });
    return NextResponse.json(
      { message: "Events fetched succes77777777777777sfully", events },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch events",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
