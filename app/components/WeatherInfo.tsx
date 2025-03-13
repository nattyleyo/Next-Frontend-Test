"use client";

interface WeatherInfoProps {
  output: string;
}

export function WeatherInfo({ output }: WeatherInfoProps) {
  return (
    <div className="flex flex-col gap-2 p-4 border-[0.2px] border-teal-500/30 bg-white rounded-lg">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🌦️</span>
        <span className="font-semibold">Weather Info:</span>
      </div>
      <div>{output}</div>
    </div>
  );
}
