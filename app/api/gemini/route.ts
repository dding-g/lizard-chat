// pages/api/gemini.ts
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  // const { input } = req.body;

  const body = { contents: [{ parts: [{ text: "Explain how AI works" }] }] };

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body }),
    }
  );

  if (!response.ok) {
    const ret = await response.json();
    return new Response(ret.error.message, { status: response.status });
  }

  const ret = await response.json();
  console.log({ ret });
  // const reader = ret.body?.getReader();
  // const decoder = new TextDecoder();
  // let done = false;

  // res.setHeader("Content-Type", "text/event-stream");
  // res.setHeader("Cache-Control", "no-cache");
  // res.setHeader("Connection", "keep-alive");
  // res.flushHeaders();

  // if (reader) {
  //   while (!done) {
  //     const { value, done: doneReading } = await reader.read();
  //     done = doneReading;
  //     const chunk = decoder.decode(value);

  //     if (chunk) {
  //       res.write(`data: ${chunk}\n\n`);

  //       // Firestore에 데이터 저장
  //       await addDoc(collection(db, "gemini_responses"), {
  //         response: chunk,
  //         timestamp: new Date(),
  //       });
  //     }
  //   }
  // }

  return new Response(JSON.stringify(ret));
};
