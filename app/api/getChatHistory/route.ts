import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type ChatHistory = {
  userMessage: string;
  aiMessage: string | React.ReactNode;
}[];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json(
        { message: "sessionId is required" },
        { status: 400 }
      );
    }

    // Define the path to the JSON file
    const filePath = path.join(process.cwd(), "data", "chatHistory.json");

    // Check if the file exists
    if (fs.existsSync(filePath)) {
      const existingData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      // Retrieve the chat history for the current session
      const chatHistory: ChatHistory = existingData[sessionId] || [];

      return NextResponse.json(chatHistory, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Chat history not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error retrieving chat history:", error);
    return NextResponse.json(
      { message: "Failed to retrieve chat history" },
      { status: 500 }
    );
  }
}
