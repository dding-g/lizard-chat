import { chatItemBuilder, getChats } from "./service/chat";
import ChatContainer from "./ChatContainer";

const AiPage = async () => {
  const docs = await getChats();
  const chatItems = docs.map((v) => {
    return chatItemBuilder(v.data().response);
  });

  return <ChatContainer items={chatItems} />;
};

export default AiPage;
