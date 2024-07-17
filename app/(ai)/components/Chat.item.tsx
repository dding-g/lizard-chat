import { match } from "ts-pattern";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { cn } from "@/lib/utils";
import ChatIndicator from "./Chat.indicator";

type Props = {
  id: string;
  text: string;
  type: "sent" | "received";
};

const ChatItem = ({ text, type }: Props) => {
  return (
    <div
      className={cn([
        "space-y-1 w-full",
        {
          "flex-row-reverse": type === "sent",
          "flex-row": type === "received",
        },
      ])}
    >
      <Avatar>
        <AvatarImage
          src={match(type)
            .with("received", () => "/avatar/lizard.jpeg")
            .with("sent", () => "")
            .otherwise(() => "")}
          alt=""
        />
        <AvatarFallback></AvatarFallback>
      </Avatar>
      {!text ? (
        <ChatIndicator />
      ) : (
        <div
          className={cn([
            "max-w-[80%] p-5 rounded-2xl bg-slate-50 text-black",
            {
              "rounded-r-xl rounded-bl-xl": type === "sent",
              "rounded-l-xl rounded-br-xl": type === "received",
            },
          ])}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default ChatItem;
