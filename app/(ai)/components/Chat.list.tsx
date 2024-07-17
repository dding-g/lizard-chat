"use client";
import React, { ComponentProps } from "react";
import ChatItem from "./Chat.item";

type Props = {
  items: ComponentProps<typeof ChatItem>[];
};

const ChatList = ({ items }: Props) => {
  return (
    <ul className="w-full p-0 pb-10 m-0 space-y-2">
      {items.map((v) => (
        <li key={v.id} className="p-0 m-0">
          <ChatItem {...v} />
        </li>
      ))}
    </ul>
  );
};

export default ChatList;
