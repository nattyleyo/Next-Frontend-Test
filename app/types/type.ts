export interface Message {
  role: "user" | "assistant";
  content: string | JSX.Element;
}

export interface WeatherInfoProps {
  city: string;
  temperature: number;
  condition: string;
}

export interface DealershipAddressProps {
  address: string;
}

export interface AppointmentSlotsProps {
  slots: string[];
}

export interface AppointmentConfirmationProps {
  date: string;
  time: string;
}
