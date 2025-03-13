import { Menu, X } from "lucide-react";
import RobotComp from "../RobotComp";

interface ChatHeaderProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function ChatHeader({
  sidebarOpen,
  toggleSidebar,
}: ChatHeaderProps) {
  return (
    <div className="w-full fixed right-0 top-0 px-[4%] z-40 backdrop-blur-sm bg-white border-b border-gray-300 text-gray-800 p-4 flex justify-between items-center">
      <button onClick={toggleSidebar} className="md:hidden">
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <div className="flex gap-2 mx-auto">
        <RobotComp size="80" />
        <h1 className="text-xl font-bold mx-auto">SuperCar Assistant</h1>
      </div>
    </div>
  );
}
