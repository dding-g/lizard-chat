import ChatContainer from "./ChatContainer";
import { getChats } from "./service/chat.server";

const AiPage = async () => {
  const docs = await getChats();
  const items = docs.map((v) => v.data().chat).filter(Boolean);
  return <ChatContainer items={items} />;
};

export default AiPage;
