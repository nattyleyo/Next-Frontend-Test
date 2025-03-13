// app/api/sse/route.ts
import { NextResponse } from "next/server";
import fetch from "node-fetch";

export async function POST(request: Request) {
  try {
    const { query, session_id } = await request.json();
    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/query`;

    console.log("Request--->", query, session_id);

    const backendRes = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
        session_id: session_id,
      }),
    });

    // Set up SSE headers
    const headers = new Headers();
    headers.set("Content-Type", "text/event-stream");
    headers.set("Cache-Control", "no-cache");
    headers.set("Connection", "keep-alive");

    // Pipe backend response to client
    return new Response(backendRes.body, {
      headers,
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
