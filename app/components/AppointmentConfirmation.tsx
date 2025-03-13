"use client";

interface AppointmentConfirmationProps {
  output: string;
}

export function AppointmentConfirmation({
  output,
}: AppointmentConfirmationProps) {
  // Step 1: Remove triple backticks
  let cleanedData = output.replace(/```/g, "").trim();

  // Step 2: Ensure JSON-compatible format
  cleanedData = cleanedData.replace(/'/g, '"');

  cleanedData = `${cleanedData.trim().replace(/^"\{|\}"$/g, "")}`;

  const manualParse = (str: string) => {
    // Remove the surrounding curly braces and extra spaces
    const cleanedString = str.slice(1, -1).trim();

    // Split the string by commas into key-value pairs
    const keyValuePairs = cleanedString.split(", ");

    // Create an empty object
    const parsedObject: Record<string, string> = {};

    // Loop through each key-value pair
    keyValuePairs.forEach((pair) => {
      // Split each pair by the colon
      const [key, value] = pair
        .split(": ")
        .map((item) => item.replace(/"/g, "").trim());

      // Add the key and value to the object
      parsedObject[key] = value;
    });

    return parsedObject;
  };

  const parsedObject = manualParse(cleanedData);
  console.log("pppp", parsedObject);

  return (
    <div className="flex flex-col gap-2 p-4 border-0 border-teal-500 bg-white rounded-lg">
      <div className="flex items-center gap-2">
        <span className="text-2xl">✅</span>
        <span className="font-semibold">Appointment Scheduled:</span>
      </div>
      {parsedObject.hora ? (
        <>
          <div className="text-gray-700">
            <span className="font-semibold">Confirmation ID:</span>{" "}
            {parsedObject.confirmacion_id}
          </div>
          <div className="text-gray-700">
            <span className="font-semibold">Date:</span> {parsedObject.fecha}
          </div>
          <div className="text-gray-700">
            <span className="font-semibold">Time:</span> {parsedObject.hora}
          </div>
          <div className="text-gray-700">
            <span className="font-semibold">Model:</span> {parsedObject.modelo}
          </div>
          <div className="text-gray-700">
            <span className="font-semibold">Message:</span>{" "}
            {parsedObject.mensaje}
          </div>
        </>
      ) : (
        <div className="text-gray-700">No Appointment schedule yet</div>
      )}
    </div>
  );
}
