import React, { useEffect, useState } from "react";
import Http from "../../../services/handlers/Http";
import { baseUrl } from "../../../services/api/urls/Links";
import { Endpoints } from "../../../services/api/urls/Endpoints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import Alerts from "../../../util/alerts/Alerts";
import BarLoader from "../../components/BarLoader";

const RecentChats: React.FC = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [chats, setChats] = useState([]);
  const http = new Http();
  const chatUrl = baseUrl + Endpoints.chats;

  useEffect(
    () => {
      getChats();
    },
    // eslint-disable-next-line
    [],
  );

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
  const styles: string =
    "flex bg-gray-950 p-3 rounded-md border border-gray-800 items-center justify-between mt-1";
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
            <div className={styles}>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faUserSecret}
                  size="2xl"
                  className="mr-3"
                />
                <div className="mr-2">
                  <p>{(chat as any).sender_email[0].name}</p>
                  <p className="text-sm text-indigo-500">New Request</p>
                </div>
              </div>
              <div className="mr-2">
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentChats;
