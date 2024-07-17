"use client";
import React, { ComponentProps } from "react";
import ChatList from "./components/Chat.list";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatInput from "./components/Chat.input";
import { useForm } from "react-hook-form";
import { addChat } from "./service/chat";

type Props = {
  items: ComponentProps<typeof ChatList>["items"];
};

const CHAT_INPUT_ID = "chatInput";

const ChatContainer = ({ items }: Props) => {
  const method = useForm();

  const saveChat = async () => {
    const data = method.watch(CHAT_INPUT_ID);

    method.setValue(CHAT_INPUT_ID, "");

    await addChat({
      text: data ?? "",
      type: "sent",
    });
  };

  return (
    <div className="space-y-4">
      <ScrollArea className="w-full h-[400px]">
        <ChatList items={items} />
      </ScrollArea>
      <form onSubmit={method.handleSubmit(saveChat)}>
        <ChatInput control={method.control} name={CHAT_INPUT_ID} />
      </form>
    </div>
  );
};

export default ChatContainer;
