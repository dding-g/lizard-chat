import { match } from "ts-pattern";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { cn } from "@/lib/utils";
import ChatIndicator from "./Chat.indicator";

export type ChatItemData = {
  id: string;
  text: string;
  type: "sent" | "received";
};

const ChatItem = ({ text, type }: ChatItemData) => {
  return (
    <div
      className={cn([
        "space-y-1 w-full flex gap-2",
        {
          "flex-row-reverse": type === "sent",
          "flex-row": type === "received",
        },
      ])}
    >
      <Avatar>
        <AvatarImage
          src={match(type)
            .with("received", () => "/avatar/lizard.jpg")
            .with("sent", () => "/avatar/master.jpg")
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
            "max-w-[80%] px-5 py-4 rounded-2xl text-black",
            {
              "rounded-r-xl rounded-bl-xl bg-slate-100": type === "sent",
              "rounded-l-xl rounded-br-xl bg-green-100": type === "received",
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
