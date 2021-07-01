import { h, IS_BROWSER, useState, useEffect, useCallback } from "../deps.ts";

interface Message {
  text: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = useCallback(async () => {
    const res = await fetch("https://ab-deno-chat-api.deno.dev/");
    const data = await res.json();
    setMessages(data);
  });

  return <div>{JSON.stringify(messages)}</div>;
}
