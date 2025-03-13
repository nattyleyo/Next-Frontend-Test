// utils/sseStream.ts
export async function sseStream(
  url: string,
  body: any,
  onData: (event: string, data: string) => void,
  onError: (error: Error) => void
) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.body) {
      throw new Error("No response body");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");

      for (let i = 0; i < lines.length - 1; i++) {
        const line = lines[i];
        if (!line.trim()) continue;

        if (line.startsWith("event:")) {
          const event = line.split(":")[1].trim();
          const dataLine = lines[i + 1];

          if (dataLine.startsWith("data:")) {
            const data = dataLine.split(/:(.+)/)[1].trim();
            onData(event, data); // Call the onData callback with the event and data
          }
        }
      }

      buffer = lines[lines.length - 1];
    }
  } catch (error) {
    onError(error instanceof Error ? error : new Error("Unknown error")); // Call the onError callback
  }
}
