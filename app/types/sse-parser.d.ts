// types/sse-parser.d.ts
declare module "eventsource-parser" {
  export interface ParsedEvent {
    type: string;
    data: string;
    id?: string;
    retry?: number;
  }

  export interface ReconnectInterval {
    type: "reconnect-interval";
    value: number;
  }

  export function createParser(
    onParse: (event: ParsedEvent | ReconnectInterval) => void
  ): {
    feed: (chunk: string) => void;
  };
}
