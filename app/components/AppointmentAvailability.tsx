"use client";

interface AppointmentAvailabilityProps {
  timeSlots: string[];
}

export function AppointmentAvailability({
  timeSlots,
}: AppointmentAvailabilityProps) {
  return (
    <div className="flex flex-col gap-2 p-4 border-[0.2px] border-teal-500/30 bg-white rounded-lg">
      <div className="flex items-center gap-2">
        <span className="text-2xl">📅</span>
        <span className="font-semibold">Appointment Availability:</span>
      </div>
      <div>Available slots</div>
      <div className="flex flex-wrap gap-4">
        {timeSlots.map((slot, index) => (
          <div
            key={index}
            className="px-6 py-2 bg-teal-500 text-white rounded-full cursor-pointer transition-all hover:bg-teal-700"
          >
            {slot}
          </div>
        ))}
      </div>
    </div>
  );
}
