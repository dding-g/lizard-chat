import { db } from "@/lib/firebase";
import { v4 as uuidv4 } from "uuid";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
} from "@firebase/firestore";

type Chat = {
  id?: string;
  text: string;
  type: "sent" | "received";
};
export const chatItemBuilder = ({ id = uuidv4(), text, type }: Chat) => {
  return {
    id,
    text,
    type,
  };
};

export const addChat = async (chat: Chat) => {
  try {
    await addDoc(collection(db, "chat_history"), {
      response: chat,
      timestamp: serverTimestamp(),
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getChats = async (lastVisibleDoc = null) => {
  const q = lastVisibleDoc
    ? query(
        collection(db, "chat_history"),
        orderBy("timestamp", "asc"),
        startAfter(lastVisibleDoc),
        limit(100)
      )
    : query(
        collection(db, "chat_history"),
        orderBy("timestamp", "asc"),
        limit(100)
      );

  const snapshot = await getDocs(q);
  return snapshot.docs;
};
