// pages/api/gemini.ts
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { ChatItemData } from "@/(ai)/components/Chat.item";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { id, text, responseUUID } = await req.json();

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
    response: {
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
    response: { ...ret, model: "gemini-1.5-flash" },
    timestamp: new Date().toISOString(),
  });

  const textResponse = ret.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

  await addDoc(collection(db, "chat_history"), {
    response: {
      id: responseUUID,
      text: textResponse,
      type: "received",
    } as ChatItemData,
    timestamp: new Date().toISOString(),
  });

  return new Response(JSON.stringify({ text: textResponse }));
};
