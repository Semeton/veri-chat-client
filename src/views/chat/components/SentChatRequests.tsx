import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../components/Loader";

const SentChatRequests: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const goBack = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/chats");
    }, 1000);
  };

  const styles: string =
    "flex bg-gray-800 p-3 rounded-md border border-gray-600 items-center justify-between mb-3";
  return (
    <div className="fixed right-0 left-0 bottom-0 top-0">
      {loading && <Loader />}
      <div className="flex flex-col h-screen justify-between bg-gray-900 text-white">
        <main className="mb-auto p-4 px-5">
          <div className="grid grid-cols-3 justify-between text-white items-center mb-5 mt-2">
            <div onClick={goBack} className={"cursor-pointer"}>
              <FontAwesomeIcon icon={faArrowLeftLong} />
            </div>
            <div className="col-span-2">
              <h1 className="text-lg font-bold leading-tight tracking-tight md:text-2xl text-white">
                All Sent Requests
              </h1>
            </div>
          </div>
          <div className="mt-3 overflow-y-scroll">
            <div className="grid">
              <div className={styles}>
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faUserSecret}
                    size="2xl"
                    className="mr-3"
                  />
                  <div className="mr-2">
                    <p>Balogun Semeton</p>
                    <p className="text-sm text-indigo-500">New Request</p>
                  </div>
                </div>
                <div className="mr-2">
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </div>
              </div>
              <div className={styles}>
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faUserSecret}
                    size="2xl"
                    className="mr-3"
                  />
                  <div className="mr-2">
                    <p>Semeton James</p>
                    <p className="text-sm text-indigo-500">New Request</p>
                  </div>
                </div>
                <div className="mr-2">
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </div>
              </div>
              <div className={styles}>
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faUserSecret}
                    size="2xl"
                    className="mr-3"
                  />
                  <div className="mr-2">
                    <p>Balogun James</p>
                    <p className="text-sm text-green-500">Accepted</p>
                  </div>
                </div>
                <div className="mr-2">
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </div>
              </div>
              <div className={styles}>
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faUserSecret}
                    size="2xl"
                    className="mr-3"
                  />
                  <div className="mr-2">
                    <p>Jimoh Gbesi</p>
                    <p className="text-sm text-green-500">Accepted</p>
                  </div>
                </div>
                <div className="mr-2">
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </div>
              </div>
              <div className={styles}>
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faUserSecret}
                    size="2xl"
                    className="mr-3"
                  />
                  <div className="mr-2">
                    <p>Jimoh James</p>
                    <p className="text-sm text-red-500">Rejected</p>
                  </div>
                </div>
                <div className="mr-2">
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SentChatRequests;
