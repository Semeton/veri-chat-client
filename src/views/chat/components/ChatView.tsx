import { useParams, useNavigate } from "react-router-dom";
import Http from "../../../services/handlers/Http";
import { baseUrl } from "../../../services/api/urls/Links";
import { Endpoints } from "../../../services/api/urls/Endpoints";
import Alerts from "../../../util/alerts/Alerts";
import { useEffect } from "react";

const ChatView: React.FC = () => {
  const { id, secret } = useParams();

  const http = Http.getInstance();
  const chatMessagesUrl = baseUrl + Endpoints.chatMessages;

  const navigate = useNavigate();

  useEffect(
    () => {
      getChatMessages();
    },
    // eslint-disable-next-line
    [],
  );

  const getChatMessages = () => {
    http
      .get(chatMessagesUrl + id + "/" + secret)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.error(e);
        let message = e.response?.data?.message ?? e.message;
        Alerts.error(message);
        navigate("/dashboard");
      });
  };

  return (
    <div className="fixed">
      <div className="flex h-screen flex-col justify-between bg-gray-900">
        <header className="mb-2 grid grid-cols-3 items-center justify-between text-white">
          <div
            onClick={() => window.history.back()}
            className="flex h-16 items-center p-6"
          >
            Back
          </div>
          <div className="mx-auto">
            <div className="flex items-center justify-center rounded-full bg-gray-950 text-center text-indigo-500">
              Full Name
            </div>
          </div>
          <div className="flex h-16 items-center justify-end p-6">Settings</div>
        </header>
        <main id="main" className="mb-auto overflow-y-scroll p-3 px-5">
          {id}
        </main>
        <div className="bottom-0 h-20 w-screen bg-gray-950 pt-3">
          <div className="flex items-center justify-around text-center text-sm text-white"></div>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
