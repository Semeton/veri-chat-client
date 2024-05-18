import React, { useEffect, useState } from "react";
import Http from "../../../services/handlers/Http";
import { baseUrl } from "../../../services/api/urls/Links";
import { Endpoints } from "../../../services/api/urls/Endpoints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faUser,
  faCircleInfo,
  faLightbulb,
  faArrowLeftLong,
  faLock,
  faUnlockKeyhole,
} from "@fortawesome/free-solid-svg-icons";
import Alerts from "../../../util/alerts/Alerts";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import Swal from "sweetalert2";

const ChatSettings: React.FC = () => {
  const [other, setOther] = useState(0);
  const [chatName, setChatName] = useState("");
  const [chatEmail, setChatEmail] = useState("");
  const [loading, setLoading] = useState<Boolean>(false);

  const { id } = useParams();

  const http = Http.getInstance();
  const chatUrl = baseUrl + Endpoints.chat + id;
  const unlockChatUrl = baseUrl + Endpoints.chatUnlock + id;

  const navigate = useNavigate();

  useEffect(
    () => {
      getChat();
    },
    // eslint-disable-next-line
    [],
  );

  const getChat = () => {
    setLoading(true);
    http
      .get(chatUrl)
      .then((res) => {
        console.log(res);
        res.role === "sender"
          ? setOther(res.recipient_lock)
          : setOther(res.sender_lock);
        setChatName(res.other.name);
        setChatEmail(res.other.email);
        setLoading(false);
      })
      .catch((e) => {
        let message = e.response?.data?.message ?? e.message;
        Alerts.error(message);
        navigate("/dashboard");
      });
  };

  const unlockChat = () => {
    Swal.fire({
      // title: "",
      text: "Are you sure you want to unlock this chat message?",
      icon: "warning",
      iconColor: "#d33",
      showCancelButton: true,
      color: "#fff",
      confirmButtonColor: "#6366f1",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, unlock it!",
    }).then((result) => {
      if (result.isConfirmed) {
        http
          .get(unlockChatUrl)
          .then((res) => {
            Alerts.success(res.message);
            getChat();
          })
          .catch((e) => {
            let message = e.response?.data?.message ?? e.message;
            Alerts.error(message);
            setLoading(false);
          });
      }
    });
  };

  const styles: string =
    "flex bg-gray-950 p-3 rounded-md border border-gray-800 items-center justify-between mt-1";
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0">
      {loading && <Loader />}
      <div className="flex h-screen flex-col justify-between bg-gray-900 text-white">
        <main className="mb-auto overflow-y-scroll">
          <header className="grid grid-cols-3 justify-between text-white">
            <div
              onClick={() => window.history.back()}
              className="h-16 flex p-6 items-center"
            >
              <FontAwesomeIcon icon={faArrowLeftLong} size="lg" />
            </div>
            <div className="mx-auto">
              <div className="flex justify-center my-2 mt-4">
                <div className="text-indigo-500 rounded-full h-20 w-20 bg-gray-950 text-center justify-center flex items-center">
                  <FontAwesomeIcon
                    className="text-center"
                    icon={faUser}
                    size="3x"
                  />
                </div>
              </div>
              <div className="mt-1 text-center">
                <h3 className="font-bold text-xl">{chatName}</h3>
                <p className="text-sm text-center">{chatEmail}</p>
              </div>
            </div>
            <div></div>
          </header>
          <div className="p-4 px-5 grid">
            {other === 0 ? (
              <div className={styles}>
                <div className="">
                  <div>
                    <FontAwesomeIcon className="mr-2" icon={faLightbulb} />
                    <strong className="text-green-500">ACTIVE</strong>
                  </div>
                </div>
                <div className="mr-2 text-green-500">
                  <FontAwesomeIcon icon={faCheckCircle} />
                </div>
              </div>
            ) : (
              <>
                <div className={styles}>
                  <div className="">
                    {/* <p className="text-xs mb-2 text-white">STATUS</p> */}
                    <div className="text-red-600">
                      <FontAwesomeIcon className="mr-2" icon={faLock} />
                      <strong className="">LOCKED</strong>
                    </div>
                  </div>
                  <div
                    className="mr-2 text-green-500"
                    onClick={() => unlockChat()}
                  >
                    <FontAwesomeIcon icon={faUnlockKeyhole} />
                  </div>
                </div>
                <div className={styles}>
                  <div className="text-sm mt-2">
                    <div className="mb-2 text-yellow-600">
                      <FontAwesomeIcon className="mr-1" icon={faCircleInfo} />
                      <span className="text-sm">NOTICE</span>
                    </div>
                    <div className="text-gray-400">
                      <p>
                        The recipient has locked this chat from their end. To
                        unlock the chat on their behalf, click on the green
                        unlock key on the right
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            <hr className="mt-5 mb-5 border-gray-700" />

            <div className={styles}>
              <div className="text-sm">
                <div className="mb-2 text-red-600">
                  <FontAwesomeIcon className="mr-1" icon={faCircleInfo} />
                  <span className="text-sm font-bold">IMPORTANT</span>
                </div>
                <div className="text-gray-400">
                  <p>
                    This chat is completely end-to-end encrypted and secured
                    with your chosen secret key. Do not share it under any
                    circumstance!
                  </p>
                  <br />
                  <p>
                    In case of an emergency, enter the secret in reverse (e.g if
                    secret = 12345, enter <strong>54321</strong>). This will
                    lock the chat and can only be unlocked by the your partner,
                    the recipient.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChatSettings;
