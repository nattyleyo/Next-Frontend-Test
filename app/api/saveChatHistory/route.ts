import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type ChatHistory = {
  userMessage: string;
  aiMessage: string | { type: string; props: any };
}[];

export async function POST(request: Request) {
  try {
    const {
      sessionId,
      chatHistory,
    }: { sessionId: string; chatHistory: ChatHistory } = await request.json();

    // Define the path to the JSON file
    const filePath = path.join(process.cwd(), "data", "chatHistory.json");

    // Read the existing chat history
    const existingData = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, "utf-8"))
      : {};

    // Update the chat history for the current session
    existingData[sessionId] = chatHistory;

    // Write the updated chat history back to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    return NextResponse.json(
      { message: "Chat history saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving chat history:", error);
    return NextResponse.json(
      { message: "Failed to save chat history" },
      { status: 500 }
    );
  }
}
