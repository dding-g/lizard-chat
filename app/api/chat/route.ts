// pages/api/gemini.ts
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { ChatItemData } from "@/(ai)/components/Chat.item";
import { AUTH_COOKIE_NAME } from "@/constants/auth";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { id, text } = await req.json();
  const userId = req.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = {
    contents: [
      {
        parts: [
          {
            text: `
  ${text}
    `,
          },
        ],
      },
    ],
  };

  await addDoc(collection(db, "chat_history"), {
    userId,
    chat: {
      id,
      text,
      type: "sent",
    } as ChatItemData,
    timestamp: new Date().toISOString(),
  });

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    const ret = await response.json();

    return new Response(ret.error.message, { status: response.status });
  }

  const ret = await response.json();

  await addDoc(collection(db, "gemini_responses"), {
    response: ret,
    userId,
    model: "gemini-1.5-flash",
    timestamp: new Date().toISOString(),
  });

  const textResponse = ret.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

  await addDoc(collection(db, "chat_history"), {
    userId,
    chat: {
      id,
      text: textResponse,
      type: "received",
    } as ChatItemData,
    timestamp: new Date().toISOString(),
  });

  return new Response(JSON.stringify({ text: textResponse }));
};
