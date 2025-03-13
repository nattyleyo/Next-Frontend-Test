"use client";

export function TypingIndicator() {
  return (
    <div className="flex space-x-1">
      {/* First dot: Bounces quickly */}
      <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce animation-duration-300 animation-delay-0"></div>
      {/* Second dot: Bounces with a slight delay and slower */}
      <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce animation-duration-500 animation-delay-100"></div>
      {/* Third dot: Bounces with a longer delay and even slower */}
      <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce animation-duration-700 animation-delay-200"></div>
    </div>
  );
}
