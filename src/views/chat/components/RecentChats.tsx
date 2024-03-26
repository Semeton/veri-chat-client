import React, { useEffect, useState } from "react";
import Http from "../../../services/handlers/Http";
import { baseUrl } from "../../../services/api/urls/Links";
import { Endpoints } from "../../../services/api/urls/Endpoints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import Alerts from "../../../util/alerts/Alerts";
import BarLoader from "../../components/BarLoader";

const RecentChats: React.FC = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [chats, setChats] = useState([]);
  const http = new Http();
  const chatUrl = baseUrl + Endpoints.chats;
  const chatSecretUrl = baseUrl + Endpoints.chatSecret;

  useEffect(
    () => {
      getChats();
    },
    // eslint-disable-next-line
    [],
  );

  const styles: string =
    "flex bg-gray-950 p-3 rounded-md border border-gray-800 items-center justify-between mt-1";

  const getChats = () => {
    setLoading(true);
    http
      .get(chatUrl)
      .then((res) => {
        console.log(res);
        setChats(res);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        let message = e.response?.data?.message ?? e.message;
        Alerts.error(message);
        setLoading(false);
      });
  };

  const openChat = (lock: string | null, uuid: string) => {
    if (lock === null) {
      alert("You need to set a chat secret for this chat first");
      setChatSecret(uuid);
    }

    let secret: string | null = prompt("Enter chat secret keys:", "");
    if (secret === null) {
      alert("Canceled! Secret was not enter.");
      return;
    }
    console.log("Opened chat: ", uuid);
  };

  const setChatSecret = (uuid: string) => {
    let secret: string | null = prompt("Enter chatsecret keys:", "");
    if (secret === null) {
      alert("Canceled! Secret was not set.");
      return;
    }
    if (secret.length < 6) {
      alert("Secret must be at least 6 characters and cannot be empty.");
      return;
    }
    let csecret: string | null = prompt("Confirm secret keys:", "");
    if (csecret === null) {
      alert("Secret was not confirmed.");
      return;
    }
    while (csecret !== secret) {
      alert("Secrets do not match. Please try again.");
      secret = prompt("Enter secret keys:", "");
      if (secret === null || secret.length < 6) {
        alert(
          "Secret was not set or does not meet the minimum length requirement.",
        );
        return;
      }
      csecret = prompt("Confirm secret keys:", "");
      if (csecret === null) {
        alert("Secret confirmation was cancelled.");
        return;
      }
    }

    const data: FormData = new FormData();
    data.append("chat_secret", secret);

    http
      .post(chatSecretUrl + uuid, data)
      .then((res) => {
        console.log(res);
        Alerts.success("Chat secret set successfully");
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        let message = e.response?.data?.message ?? e.message;
        Alerts.error(message);
        setLoading(false);
      });

    console.log(uuid, secret, csecret);
  };

  return (
    <div className="">
      {loading ? (
        <BarLoader />
      ) : chats.length === 0 ? (
        <div className="mt-10 text-center text-white">
          <div className="mb-3 mt-7 text-indigo-500">
            <FontAwesomeIcon
              icon={faUserSecret}
              size="2xl"
              style={{ fontSize: "100px" }}
              className=""
            />
          </div>
          <h3 className="text-2xl font-bold">Ooops!</h3>
          <p className="">You do not have an active chat</p>
          <p className="text-sm text-indigo-500">Send a chat request</p>
        </div>
      ) : (
        <div className="grid">
          {chats.map((chat) => (
            <div
              className={styles}
              onClick={() =>
                openChat(
                  (chat as any).role === "sender"
                    ? (chat as any).sender_secret
                    : (chat as any).recipient_secret,
                  (chat as any).uuid,
                )
              }
            >
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faUserSecret}
                  size="2xl"
                  className="mr-3"
                />
                <div className="mr-2">
                  <p>{(chat as any).other.name}</p>
                </div>
              </div>
              <div className="mr-2">
                <p className="text-xs text-green-500">NEW</p>
                {/* <FontAwesomeIcon icon={faEllipsisVertical} /> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentChats;
