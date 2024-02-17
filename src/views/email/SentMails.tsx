import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const SentMails: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const goBack = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/emails");
    }, 1000);
  };
  const styles: string =
    "flex bg-gray-950 p-3 text-white rounded-md border border-gray-800 items-center justify-between mt-1";
  return (
    <div className="fixed right-0 left-0 bottom-0 top-0">
      {loading && <Loader />}
      <div className="flex flex-col h-screen justify-between bg-gray-900 text-white">
        <main className="mb-auto p-4 px-5">
          <div onClick={goBack} className={"cursor-pointer"}>
            <FontAwesomeIcon icon={faArrowLeftLong} className="mr-3" />
            Back
          </div>
          <div className="mt-8 mb-5">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              All Sent Emails
            </h1>
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
                    <p className="text-xs">2 days ago</p>
                    <p>Business Proposal</p>
                    <p className="text-sm text-indigo-500 text-indigo-500">
                      semeton@email.com
                    </p>
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
                    <p className="text-xs">2 days ago</p>
                    <p>Business Proposal</p>
                    <p className="text-sm text-indigo-500">semeton@email.com</p>
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
                    <p className="text-xs">2 days ago</p>
                    <p>Business Proposal</p>
                    <p className="text-sm text-indigo-500">semeton@email.com</p>
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
                    <p className="text-xs">2 days ago</p>
                    <p>Business Proposal</p>
                    <p className="text-sm text-indigo-500">semeton@email.com</p>
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
                    <p className="text-xs">2 days ago</p>
                    <p>Business Proposal</p>
                    <p className="text-sm text-indigo-500">semeton@email.com</p>
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

export default SentMails;
