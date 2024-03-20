import { useParams } from "react-router-dom";

const ChatView: React.FC = () => {
  const { id } = useParams();

  return <div>Hello {id}</div>;
};

export default ChatView;
