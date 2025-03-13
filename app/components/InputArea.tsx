"use client";

interface InputAreaProps {
  query: string;
  setQuery: (query: string) => void;
  isLoading: boolean;
  handleSubmit: () => void;
}

export function InputArea({
  query,
  setQuery,
  isLoading,
  handleSubmit,
}: InputAreaProps) {
  // Function to handle pressing 'Enter'
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      handleSubmit();
    }
  };

  return (
    <div
      className={`w-full fixed bottom-0 right-0 bg-white p-8 lg:pl-[30vw] lg:pr-[10vw] z-20`}
    >
      <div className="flex gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown} // Added onKeyDown handler
          placeholder="Enter your query"
          disabled={isLoading}
          className="flex-grow p-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50"
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="px-6 py-4 bg-teal-600 text-white rounded-full hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50"
          dangerouslySetInnerHTML={{
            __html: isLoading ? `Analysing..` : "Send",
          }}
        ></button>
      </div>
    </div>
  );
}
