import { Input } from "@/components/textfield";
import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import { Send } from "lucide-react";

type Props = {
  name: string;
  control: Control<FieldValues>;
  disabled: boolean;
};
const ChatInput = ({ name, control, disabled = false }: Props) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="relative">
          <Input {...field} disabled={disabled} />
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
