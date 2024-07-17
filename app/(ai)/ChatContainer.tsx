"use client";
import React, { ComponentProps, useState } from "react";
import ChatList from "./components/Chat.list";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatInput from "./components/Chat.input";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { ChatItemData } from "./components/Chat.item";
import { produce } from "immer";

type Props = {
  items: ChatItemData[];
};

const CHAT_INPUT_ID = "chatInput";

const ChatContainer = ({ items }: Props) => {
  const method = useForm();
  const [chatListData, setChatListData] = useState<ChatItemData[]>(items);

  const saveChat = async () => {
    const data = method.watch(CHAT_INPUT_ID);
    const uuid = uuidv4();
    const body = {
      id: `${uuid}_sent`,
      text: data,
      responseUUID: `${uuid}_received`,
    };

    method.setValue(CHAT_INPUT_ID, "");

    setChatListData(
      produce(chatListData, (draft) => {
        draft.push({
          id: body.id,
          text: body.text,
          type: "sent",
        });
        draft.push({
          id: body.responseUUID,
          text: "",
          type: "received",
        });
      })
    );

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const ret = await res.json();

    setChatListData(
      produce(chatListData, (draft) => {
        const idx = draft.findIndex((v) => v.id === body.responseUUID);
        if (idx > -1) {
          draft[idx].text = ret.text;
        }
      })
    );
  };

  return (
    <div>
      <ScrollArea className="w-full h-[600px] px-4">
        <ChatList items={chatListData} />
      </ScrollArea>
      <div>
        <form onSubmit={method.handleSubmit(saveChat)}>
          <ChatInput
            control={method.control}
            name={CHAT_INPUT_ID}
            disabled={
              chatListData[chatListData.length - 1]?.type === "received" &&
              chatListData[chatListData.length - 1]?.text === ""
            }
          />
        </form>
      </div>
    </div>
  );
};

export default ChatContainer;
