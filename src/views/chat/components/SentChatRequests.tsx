import React, { useEffect, useState } from "react";
import Http from "../../../services/handlers/Http";
import { baseUrl } from "../../../services/api/urls/Links";
import { Endpoints } from "../../../services/api/urls/Endpoints";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserSecret,
  faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";
import Alerts from "../../../util/alerts/Alerts";
import BarLoader from "../../components/BarLoader";

const SentChatRequests: React.FC = () => {
  const [chatsRequest, setChatsRequest] = useState<Array<object>>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const http = Http.getInstance();
  const chatUrl = baseUrl + Endpoints.receivedChatRequest;

  const navigate = useNavigate();

  useEffect(
    () => {
      getChatsRequest();
    },
    // eslint-disable-next-line
    [],
  );

  const getChatsRequest = () => {
    setLoading(true);
    http
      .get(chatUrl)
      .then((res) => {
        console.log(res);
        if (res.sent) setChatsRequest(res.sent);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        let message = e.response?.data?.error ?? e.message;
        Alerts.error(message);
        setLoading(false);
      });
  };

  const goBack = () => {
    navigate("/chats");
  };

  const styles: string =
    "flex bg-gray-800 p-3 rounded-md border border-gray-600 items-center justify-between mb-3";
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0">
      {/* {loading && <Loader />} */}
      <div className="flex h-screen flex-col justify-between bg-gray-900 text-white">
        <main className="mb-auto p-4 px-5">
          <div className="mb-5 mt-2 grid grid-cols-3 items-center justify-between text-white">
            <div onClick={goBack} className={"cursor-pointer"}>
              <FontAwesomeIcon icon={faArrowLeftLong} />
            </div>
            <div className="col-span-2">
              <h1 className="text-lg font-bold leading-tight tracking-tight text-white md:text-2xl">
                Sent Requests
              </h1>
            </div>
          </div>
          {loading ? (
            <BarLoader />
          ) : chatsRequest.length === 0 ? (
            <div className="mt-10 h-full text-center text-white">
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
                You do not have any sent chat requests at this time
              </p>
            </div>
          ) : (
            <div className="grid">
              {chatsRequest.map((request) => (
                <div className={styles}>
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faUserSecret}
                      size="2xl"
                      className="mr-3"
                    />
                    <div className="mr-2">
                      <p>{(request as any).recipient_email[0].name}</p>
                      <p className="text-sm text-indigo-500">New Request</p>
                    </div>
                  </div>
                  <div className="mr-2 uppercase">
                    {(request as any).status === 0 && (
                      <span className="p-2 text-xs text-red-500">PENDING</span>
                    )}
                    {(request as any).status === 1 && (
                      <span className="p-2 text-xs text-green-500">
                        ACCEPTED
                      </span>
                    )}
                    {(request as any).status === 2 && (
                      <span className="p-2 text-xs text-red-500">REJECTED</span>
                    )}
                    {/* <FontAwesomeIcon
                      className="ml-3 text-red-500"
                      size="lg"
                      icon={faTimesCircle}
                    /> */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SentChatRequests;
