"use client";
import React, { useEffect, useRef, useState } from "react";
import { chatItemBuilder } from "./service/chat.client";
import ChatList from "./components/Chat.list";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatInput, { CHAT_INPUT_ID } from "./components/Chat.input";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { ChatItemData } from "./components/Chat.item";
import { produce } from "immer";

type Props = {
  items: ChatItemData[];
};

const ChatContainer = ({ items }: Props) => {
  const method = useForm({
    defaultValues: {
      [CHAT_INPUT_ID]: "",
    },
  });
  const [chatListData, setChatListData] = useState<ChatItemData[]>(
    items.map((v) => chatItemBuilder(v))
  );
  const ref = useRef<HTMLDivElement>(null);

  const saveChat = async () => {
    const data = method.watch(CHAT_INPUT_ID);
    const uuid = uuidv4();
    const body = {
      id: uuid,
      text: data,
    };

    method.setValue(CHAT_INPUT_ID, "");

    setChatListData([
      ...chatListData,
      {
        id: uuid,
        text: data,
        type: "sent",
      },
      {
        id: uuid,
        text: "",
        type: "received",
      },
    ]);

    requestAnimationFrame(() => {
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: "smooth" });
      }
    });

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
        const idx = draft.findIndex(
          (v) => v.id === body.id && v.type === "received"
        );
        if (idx > -1) {
          draft[idx].text = ret.text;
        }
      })
    );

    requestAnimationFrame(() => {
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: "smooth" });
      }
    });
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      if (ref.current) {
        ref.current.scrollTop = ref.current.scrollHeight;
      }
    });
  }, []);

  return (
    <div>
      <ScrollArea
        viewportRef={ref}
        className="w-full h-[600px] px-4 scroll-smooth"
      >
        <ChatList items={chatListData} />
      </ScrollArea>
      <div>
        <form onSubmit={method.handleSubmit(saveChat)}>
          <ChatInput
            control={method.control}
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
