import { Event } from "@/database";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const formData = await req.formData();
    try {
      const event = Object.fromEntries(formData.entries());
      const createdEvent = await Event.create(event);
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
