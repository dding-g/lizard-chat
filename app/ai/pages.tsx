"use client";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

const AiPage = () => {
  const [responses, setResponses] = useState<string[]>([]);

  useEffect(() => {
    const eventSource = new EventSource("/api/gemini");

    eventSource.onmessage = function (event) {
      setResponses((prevResponses) => [...prevResponses, event.data]);
    };

    eventSource.onerror = function () {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, "gemini_responses"),
      orderBy("timestamp", "asc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const responsesFromDb = snapshot.docs.map((doc) => doc.data().response);
      setResponses(responsesFromDb);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ul>
      {responses.map((response, index) => (
        <li key={index}>{response}</li>
      ))}
    </ul>
  );
};

export default AiPage;
