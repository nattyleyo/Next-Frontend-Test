"use client";
import { TypingIndicator } from "../../components/TypingIndicators";
import { ReactNode, useState } from "react"; // Import ReactNode
import RobotComp from "../RobotComp";
import { InputArea } from "../InputArea";

interface ChatDisplayProps {
  conversations: { userMessage: string; aiMessage: string | ReactNode }[]; // Use ReactNode
  query: string;
  setQuery: (query: string) => void;
  isLoading: boolean;
  handleSubmit: () => void;
}

export function ChatDisplay({
  conversations,
  query,
  setQuery,
  isLoading,
  handleSubmit,
}: ChatDisplayProps) {
  const total = conversations.length;
  const [flag, setFlag] = useState(false);
  return (
    <>
      <div className="flex-1 p-6 pb-[120px] flex flex-col justify-center items-center">
        <div
          className={`${
            !flag
              ? "scale-[0.9] px-4 border border-teal-500"
              : "scale-[0.8] px-16 border-[0.5px] border-teal-500/60"
          } flex flex-col gap-6 py-12 align-middle justify-center   bg-teal-50 rounded-3xl text-center`}
        >
          <RobotComp size={72} />
          <span
            className={`text-2xl font-semibold text-teal-900 ${
              !flag ? "text-4xl" : ""
            }`}
          >
            {!flag ? "Start your conversation" : "What can I help you?"}
          </span>
          <p
            className={`${
              !flag ? "visible" : "hidden"
            } text-lg text-teal-700 px-20`}
          >
            It looks like you haven't started a conversation yet. Please send a
            message to get started.
          </p>
          <button
            className={`flex ${
              !flag ? "visible" : "hidden"
            } mx-auto align-middle rounded-full justify-around w-[50%] max-w-[60%] mt-4 px-6 py-2 bg-teal-500 text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500`}
            onClick={() => setFlag(true)}
          >
            Start Chat
          </button>
        </div>

        {conversations.map((msg, index) => (
          <div key={index} className="w-full">
            {/* User Message (Right-aligned) */}
            {msg.userMessage && (
              <div className="mb-4 flex justify-end gap-3">
                <div className="bg-teal-300/10 inline-flex justify-center gap-2 text-teal-950 p-3 rounded-lg max-w-[80%] px-5">
                  {msg.userMessage}
                </div>
                <span className="flex align-middle justify-center border border-teal-500 bg-teal-100 p-1 text-2xl rounded-full h-[40px]">
                  🧑🏻‍🦱
                </span>
              </div>
            )}
            {/* AI Message (Left-aligned) */}
            {msg.aiMessage && (
              <div className="mb-4 flex justify-start gap-3">
                <span className="flex align-middle justify-center bg-teal-100 p-1 text-2xl rounded-full h-[40px]">
                  🤖
                </span>
                <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                  {typeof msg.aiMessage === "string" ? (
                    msg.aiMessage === "AI is typing..." ? (
                      <div className="flex items-center gap-2">
                        <span>{msg.aiMessage}</span>
                        <TypingIndicator />
                      </div>
                    ) : (
                      <div>{msg.aiMessage}</div>
                    )
                  ) : msg.aiMessage === "AI is Using tools..." ||
                    msg.aiMessage === "Output..." ? (
                    <div className="flex items-center gap-2">
                      <span>{msg.aiMessage}</span>
                      <TypingIndicator />
                    </div>
                  ) : (
                    msg.aiMessage
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {flag && (
        <InputArea
          query={query}
          setQuery={setQuery}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
}
