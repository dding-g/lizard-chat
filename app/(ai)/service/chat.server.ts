"use server";

import { AUTH_COOKIE_NAME } from "@/constants/auth";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "@firebase/firestore";
import { cookies } from "next/headers";

export const getChats = async (lastVisibleDoc = null) => {
  const userId = cookies().get(AUTH_COOKIE_NAME)?.value;

  const q = lastVisibleDoc
    ? query(
        collection(db, "chat_history"),
        where("userId", "==", userId),
        orderBy("timestamp", "asc"),
        startAfter(lastVisibleDoc),
        limit(100)
      )
    : query(
        collection(db, "chat_history"),
        where("userId", "==", userId),
        orderBy("timestamp", "asc"),
        limit(100)
      );

  const snapshot = await getDocs(q);
  return snapshot.docs;
};
