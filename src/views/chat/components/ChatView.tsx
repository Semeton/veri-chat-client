import { useParams, useNavigate } from "react-router-dom";
import Http from "../../../services/handlers/Http";
import { baseUrl } from "../../../services/api/urls/Links";
import { Endpoints } from "../../../services/api/urls/Endpoints";
import Alerts from "../../../util/alerts/Alerts";
import { useEffect } from "react";
import {
  faArrowLeftLong,
  faGear,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        <header className="mb-2 grid grid-cols-3 items-center justify-between bg-gray-950 text-white">
          <div
            onClick={() => window.history.back()}
            className="flex h-16 items-center p-6"
          >
            <FontAwesomeIcon icon={faArrowLeftLong} />
          </div>
          <div className="mx-auto">
            <div className="flex items-center justify-center rounded-full text-center text-lg font-bold text-indigo-500">
              Full Name
            </div>
          </div>
          <div className="flex h-16 items-center justify-end p-6">
            <FontAwesomeIcon icon={faGear} size="lg" />
          </div>
        </header>
        <main className="mb-auto mt-2 overflow-y-scroll">
          <div className="float-left my-1 max-w-xs rounded-lg bg-indigo-500 p-2 text-white">
            Message bubble on the left. Message bubble on the left
          </div>
          <div className="float-left my-1 max-w-xs rounded-lg bg-indigo-500 p-2 text-white">
            Message bubble on the left. Message bubble on the left
          </div>
          <div className="float-right my-1 max-w-xs rounded-lg bg-gray-800 p-2 text-white">
            Message bubble on the right. Message bubble on the right
          </div>
          <div className="float-left my-1 max-w-xs rounded-lg bg-indigo-500 p-2 text-white">
            Message bubble on the left. Message bubble on the left
          </div>
          <div className="float-right my-1 max-w-xs rounded-lg bg-gray-800 p-2 text-white">
            Message bubble on the right. Message bubble on the right
          </div>
          <div className="float-right my-1 max-w-xs rounded-lg bg-gray-800 p-2 text-white">
            Message bubble on the right. Message bubble on the right
          </div>
        </main>
        <div className="bottom-0 h-24 w-screen bg-gray-950 pt-5">
          <div className="flex items-center justify-around text-center text-sm text-white">
            <input
              type="text"
              name="message"
              id="message"
              className="focus:ring-primary-600 focus:border-primary-600 ml-2 block h-12 w-80 rounded-lg bg-gray-700 p-2.5 text-white placeholder-gray-400 sm:text-sm"
              // value=
              // onChange={onHandleChange}
              required
            />
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-950 text-center text-lg font-bold text-indigo-500">
              <FontAwesomeIcon icon={faPaperPlane} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
