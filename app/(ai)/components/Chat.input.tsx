import { Input } from "@/components/textfield";
import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import { Send } from "lucide-react";

type Props = {
  control: Control<{
    [CHAT_INPUT_ID]: string;
  }>;
  disabled: boolean;
};
export const CHAT_INPUT_ID = "chatInput";

const ChatInput = ({ control, disabled = false }: Props) => {
  return (
    <Controller
      control={control}
      name={CHAT_INPUT_ID}
      render={({ field }) => (
        <div className="relative">
          <Input {...field} disabled={disabled} autoComplete="off" />
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
