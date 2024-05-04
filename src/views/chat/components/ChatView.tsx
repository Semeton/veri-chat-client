import { useParams, useNavigate } from "react-router-dom";
import Http from "../../../services/handlers/Http";
import { baseUrl } from "../../../services/api/urls/Links";
import { Endpoints } from "../../../services/api/urls/Endpoints";
import Alerts from "../../../util/alerts/Alerts";
import { useEffect, useState } from "react";
import {
  faArrowLeftLong,
  faGear,
  faPaperPlane,
  faUserSecret,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BarLoader from "../../components/BarLoader";

const ChatView: React.FC = () => {
  const [chatName, setChatName] = useState("");
  const [me, setMe] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [formdata, setFormdata] = useState<{ message: string }>({
    message: "",
  });

  const { id, secret } = useParams();

  const http = Http.getInstance();
  const chatUrl = baseUrl + Endpoints.chat + id;
  const chatMessagesUrl = baseUrl + Endpoints.chatMessages;
  const sendMessageUrl = baseUrl + Endpoints.sendMessage + id;

  const navigate = useNavigate();

  useEffect(
    () => {
      getChatMessages();
      getChat();
      setLoading(false);
    },
    // eslint-disable-next-line
    [],
  );

  const getChat = () => {
    setLoading(true);
    http
      .get(chatUrl)
      .then((res) => {
        res.role === "sender" ? setMe(res.sender_id) : setMe(res.recipient_id);
        setChatName(res.other.name);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        let message = e.response?.data?.message ?? e.message;
        Alerts.error(message);
        navigate("/dashboard");
      });
  };
  const getChatMessages = () => {
    setLoading(true);
    http
      .get(chatMessagesUrl + id + "/" + secret)
      .then((res) => {
        setChatMessages(res);
        setLoading(false);
      })
      .catch((e) => {
        let message = e.response?.data?.message ?? e.message;
        Alerts.error(message);
        navigate("/dashboard");
      });
  };

  const onHandleChange = (e: any) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const sendMessage = () => {
    const data: FormData = new FormData();
    data.append("body", formdata.message);

    http
      .post(sendMessageUrl, data)
      .then((res) => {
        setFormdata({ ...formdata, message: "" });
      })
      .catch((e) => {
        let message = e.response?.data?.message ?? e.message;
        Alerts.error(message);
      });
  };

  return (
    <div className="fixed">
      {loading && <BarLoader />}
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
              {chatName}
            </div>
          </div>
          <div className="flex h-16 items-center justify-end p-6">
            <FontAwesomeIcon icon={faGear} size="lg" />
          </div>
        </header>
        <main className="mb-auto mt-2 overflow-y-scroll">
          {loading ? (
            <BarLoader />
          ) : chatMessages.length === 0 ? (
            <div className="mt-10 h-100 text-center text-white mx-5">
              <div className="mb-3 mt-7 text-indigo-500">
                <FontAwesomeIcon
                  icon={faUserSecret}
                  size="2xl"
                  style={{ fontSize: "100px" }}
                  className=""
                />
              </div>
              <h3 className="text-2xl font-bold">Ooops!</h3>
              <p className="">
                You do not have any encrypted messages. <br />
                Start typing with the box below
              </p>
            </div>
          ) : (
            <div className="block">
              {chatMessages.map((message) => (
                <div>
                  {(message as any).user_id === me ? (
                    <div className="float-left my-1 min-w-32 max-w-72 rounded-lg bg-indigo-500 p-2 text-white">
                      {(message as any).message}
                      <div className="text-right text-xs pl-5 opacity-70">
                        {(message as any).time}
                      </div>
                    </div>
                  ) : (
                    <div className="float-right my-1 min-w-32 max-w-72 rounded-lg bg-gray-800 p-2 text-white">
                      {(message as any).message}
                      <div className="text-right text-xs pl-7 opacity-70">
                        {(message as any).time}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </main>
        <div className="bottom-0 h-24 w-screen bg-gray-950 pt-5">
          <div className="flex items-center justify-around text-center text-sm text-white">
            <input
              type="text"
              name="message"
              id="message"
              className="focus:ring-primary-600 focus:border-primary-600 ml-2 block h-12 w-80 rounded-lg bg-gray-700 p-2.5 text-white placeholder-gray-400 sm:text-sm"
              value={formdata.message}
              onChange={onHandleChange}
              required
            />
            {formdata.message.length > 0 && (
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-950 text-center text-lg font-bold text-indigo-500"
                onClick={sendMessage}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
