// types/sse.d.ts
declare global {
  interface ReadableStream<R = any> {
    getReader(): ReadableStreamDefaultReader<R>;
  }
}

export interface SSEToolCall {
  id: string;
  type: string;
  function: {
    name: string;
    parameters: Record<string, unknown>;
  };
}

export interface SSEToolUseEvent {
  tool_calls: SSEToolCall[];
}