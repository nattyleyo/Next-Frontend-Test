import { ListCollapseIcon, Menu } from "lucide-react";

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  resetChat: () => void;
  chatHistory: Record<string, any>;
  loadChat: (sessionId: string) => void;
}

export default function Sidebar({
  sidebarOpen,
  toggleSidebar,
  resetChat,
  chatHistory,
  loadChat,
}: SidebarProps) {
  return (
    <div
      className={`fixed top-0 left-0 overflow-y-auto h-screen z-50 p-4 transition-transform duration-300 ease-in-out bg-white border-r border-gray-300 
      md:w-[20vw] md:translate-x-0 lg:w-[25vw] 
      ${
        sidebarOpen
          ? "translate-x-0 lg:w-[25vw] sm:w-[50vw]"
          : "-translate-x-full lg:w-[80px] sm:w-[50vw]"
      } md:block`}
    >
      <div className=" top-s flex-col gap-2">
        <div className="w-full flex justify-between p-4">
          {sidebarOpen && <h2 className="text-xl font-bold">Chat History</h2>}

          <button
            onClick={toggleSidebar}
            className="text-gray-800 focus:outline-none"
          >
            {sidebarOpen ? <ListCollapseIcon size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {sidebarOpen && (
            <button
              onClick={resetChat}
              className="bg-teal-600 text-white mt-4 px-4 py-2 rounded-lg hover:bg-teal-700"
            >
              New Chat
            </button>
          )}
        </div>
      </div>

      {sidebarOpen && (
        <>
          <div className="flex flex-col mt-8 gap-4 p-2">
            <h3>History</h3>
            <div className="History-list flex-col gap-2 p-1 bg-gray-100 min-h-[200px] rounded-2xl">
              {Object.entries(chatHistory).map(([sessionId, chat]) => (
                <div
                  key={sessionId}
                  onClick={() => loadChat(sessionId)}
                  className="p-2 hover:bg-gray-200 cursor-pointer rounded-lg"
                >
                  <p className="text-sm truncate">
                    {chat[chat.length - 1]?.userMessage || "New Chat"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
