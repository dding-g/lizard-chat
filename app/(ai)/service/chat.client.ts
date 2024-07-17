"use client";
import { v4 as uuidv4 } from "uuid";
import { ChatItemData } from "../components/Chat.item";

export const chatItemBuilder = ({
  id = uuidv4(),
  text,
  type,
}: ChatItemData) => {
  return {
    id,
    text,
    type,
  };
};
