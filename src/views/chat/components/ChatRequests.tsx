import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

const ChatRequests: React.FC = () => {
  const styles: string =
    "flex bg-gray-950 p-3 rounded-md border border-gray-800 items-center justify-between mt-1";
  return (
    <div className="">
      <div className="grid">
        <div className={styles}>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faUserSecret} size="2xl" className="mr-3" />
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
            <FontAwesomeIcon icon={faUserSecret} size="2xl" className="mr-3" />
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
            <FontAwesomeIcon icon={faUserSecret} size="2xl" className="mr-3" />
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
            <FontAwesomeIcon icon={faUserSecret} size="2xl" className="mr-3" />
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
            <FontAwesomeIcon icon={faUserSecret} size="2xl" className="mr-3" />
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
  );
};

export default ChatRequests;
