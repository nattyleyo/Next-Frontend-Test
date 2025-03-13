"use client";
import { useState, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import { ChatStream } from "../chat/ChatStream";
import Sidebar from "./Sidebar";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 768; // True if screen width is >= md (768px)
    }
    return true; // Default for SSR (Next.js)
  });

  const [sessionId, setSessionId] = useState<string>(() =>
    Math.random().toString(36).substring(2)
  );
  const [chatHistory, setChatHistory] = useState<Record<string, any>>({});

  // Load chat history from localStorage on initial render
  useEffect(() => {
    const savedChatHistory = localStorage.getItem("chatHistory");
    if (savedChatHistory) {
      setChatHistory(JSON.parse(savedChatHistory));
    }
  }, []);

  // Update sidebar state on window resize
  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const resetChat = () => {
    const newSessionId = Math.random().toString(36).substring(2);
    setSessionId(newSessionId);
    setChatHistory((prev) => ({
      ...prev,
      [newSessionId]: [], // Initialize new session with empty chat
    }));
  };

  const loadChat = (sessionId: string) => {
    setSessionId(sessionId);
  };

  return (
    <body
      className={`font-serif pt-28 w-screen overflow-x-hidden h-screen antialiased bg-white`}
      data-new-gr-c-s-check-loaded="14.1226.0"
      data-gr-ext-installed=""
    >
      <div className="flex h-full">
        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          resetChat={resetChat}
          chatHistory={chatHistory}
          loadChat={loadChat}
        />

        {/* Main Content */}
        <div
          className={`flex-1 flex flex-col ${
            sidebarOpen ? "lg:ml-[20vw]" : "lg:ml-[5vw]"
          } md:ml-[ovw]`}
        >
          <ChatHeader sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          <ChatStream
            sessionId={sessionId}
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
          />
        </div>
      </div>
    </body>
  );
}
