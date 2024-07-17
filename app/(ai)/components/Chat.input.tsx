import { Input } from "@/components/textfield";
import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import { Send } from "lucide-react";

type Props = {
  name: string;
  control: Control<FieldValues>;
};
const ChatInput = ({ name, control }: Props) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="relative">
          <Input {...field} />
          <button
            type="submit"
            className="absolute transform -translate-y-1/2 top-1/2 right-2"
          >
            <Send />
          </button>
        </div>
      )}
    />
  );
};

export default ChatInput;
