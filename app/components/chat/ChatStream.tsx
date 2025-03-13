"use client";
import { useState, useEffect } from "react";
import { sseStream } from "../../utils/sseStream";
import { ChatDisplay } from "../layouts/ChatDisplay";
import { WeatherInfo } from "../../components/WeatherInfo";
import { DealershipAddress } from "../../components/DealershipAddress";
import { AppointmentAvailability } from "../../components/AppointmentAvailability";
import { AppointmentConfirmation } from "../../components/AppointmentConfirmation";
import { ReactNode } from "react"; // Import ReactNode
import { sanitizeConversations } from "@/app/utils/sanitizeConversations";

interface ChatStreamProps {
  sessionId: string;
  chatHistory: Record<string, any>;
  setChatHistory: (history: Record<string, any>) => void;
}

export function ChatStream({
  sessionId,
  chatHistory,
  setChatHistory,
}: ChatStreamProps) {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState("");
  const [conversations, setConversations] = useState<
    { userMessage: string; aiMessage: string | ReactNode }[] // Use ReactNode
  >(chatHistory[sessionId] || []);

  // Update chat history when conversations change
  useEffect(() => {
    setChatHistory((prev: any) => ({
      ...prev,
      [sessionId]: conversations,
    }));
  }, [conversations, sessionId, setChatHistory]);

  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
    console.log("CHAT-1--->", sessionId, conversations);
    // store chathistory to json file here
    // Save chat history to JSON file

    // Sanitize the conversations array
    const sanitizedConversations = sanitizeConversations(conversations);
    const saveChatHistory = async () => {
      try {
        const response = await fetch("/api/saveChatHistory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId,
            chatHistory: sanitizedConversations,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save chat history");
        }
      } catch (error) {
        console.error("Error saving chat history:", error);
      }
    };

    saveChatHistory();
  }, [conversations]);
  // retrieve
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch(
          `/api/getChatHistory?sessionId=${sessionId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch chat history");
        }
        const data = await response.json();

        // Reconstruct React components if needed
        const reconstructedConversations = data.map((conversation: any) => {
          if (conversation.aiMessage === "[React Component]") {
            return {
              ...conversation,
              aiMessage: <WeatherInfo output="Default output" />, // Replace with the appropriate component
            };
          }
          return conversation;
        });

        setConversations(reconstructedConversations);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();
  }, [sessionId]);

  // Log the updated events state whenever it changes
  useEffect(() => {
    console.log("event", events);
  }, [events]);

  const formatText = (text: string) => {
    return text
      .replace(/\s+([.,!?'])/g, "$1") // Remove spaces before punctuation
      .replace(/([.,!?])([^ ])/g, "$1 $2") // Ensure space after punctuation
      .replace(/(\b\w+)' (\w+\b)/g, "$1'$2"); // Fix contractions
  };

  const handleSubmit = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    const userMessage = query;
    setQuery("");
    setConversations((prev) => [
      ...prev,
      { userMessage, aiMessage: "AI is typing..." },
    ]);

    await sseStream(
      "/api/sse",
      { query: userMessage, session_id: sessionId },
      (event, data) => {
        setConversations((prev) => {
          const lastConversation = prev[prev.length - 1];
          let updatedAiMessage: string | ReactNode = lastConversation.aiMessage;

          if (event === "chunk") {
            // Only update if the current message is a string (not a tool-related message)
            if (typeof updatedAiMessage === "string") {
              updatedAiMessage = formatText(
                lastConversation.aiMessage === "AI is typing..." ||
                  lastConversation.aiMessage === "AI is Using tools..."
                  ? data
                  : lastConversation.aiMessage + " " + data
              );
            }
            setEvents("AI is typing");
          } else if (event === "tool_use") {
            updatedAiMessage = (
              <div className="flex items-center gap-2">
                <span className="text-2xl">🕹️</span>
                <span>AI is using tools...</span>
                <span className="text-2xl animate-spin">⚙️</span>
              </div>
            );
            setEvents("AI is using tools");
          } else if (event === "tool_output") {
            try {
              const parsedData = JSON.parse(data);
              if (parsedData.name === "get_weather") {
                updatedAiMessage = <WeatherInfo output={parsedData.output} />;
              } else if (parsedData.name === "get_dealership_address") {
                updatedAiMessage = (
                  <DealershipAddress output={parsedData.output} />
                );
              } else if (parsedData.name === "check_appointment_availability") {
                const rawOutput = parsedData.output.replace(/^"|"$/g, ""); // Remove outer quotes
                const cleanedOutput = rawOutput.replace(/```/g, ""); // Remove code block
                const timeSlots: string[] = JSON.parse(
                  cleanedOutput.replace(/'/g, '"')
                ); // Convert single quotes to double quotes
                updatedAiMessage = (
                  <AppointmentAvailability timeSlots={timeSlots} />
                );
              } else if (parsedData.name === "schedule_appointment") {
                updatedAiMessage = (
                  <AppointmentConfirmation output={parsedData.output} />
                );
              } else {
                updatedAiMessage = "Unknown tool output";
              }
            } catch (error) {
              console.error("Failed to parse tool_output data:", data);
              updatedAiMessage = "Error: Invalid tool output format";
            }
          } else if (event === "end") {
            console.log("Stream ended");
          }

          return [
            ...prev.slice(0, -1),
            { ...lastConversation, aiMessage: updatedAiMessage },
          ];
        });
      },
      (error) => {
        console.error("Stream error:", error);
        setConversations((prev) => {
          const lastConversation = prev[prev.length - 1];
          return [
            ...prev.slice(0, -1),
            {
              ...lastConversation,
              aiMessage:
                "Error: " +
                (error instanceof Error ? error.message : "Unknown error"),
            },
          ];
        });
      }
    );

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-screen w-full md:w-[70%] mx-auto bg-white">
      {/* Chat Messages Container */}
      <ChatDisplay
        conversations={conversations}
        query={query}
        setQuery={setQuery}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
