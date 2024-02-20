import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faVault } from "@fortawesome/free-solid-svg-icons";

const Structure = ({ page }: { page: React.ReactNode }) => {
  const location = useLocation();
  const path = location.pathname;
  return (
    <div>
      <div className="flex flex-col h-screen justify-between">
        <main className="mb-auto h-screen p-3 bg-gray-900">{page}</main>
        <div className="h-16 fixed bottom-0 bg-gray-800 w-screen pt-3">
          <div className="flex items-center justify-around text-center text-sm text-white">
            <Link to="/dashboard">
              <div className={path === "/dashboard" ? "text-indigo-300" : ""}>
                <FontAwesomeIcon icon={faHouse} size="lg" />
                <div className="mt-1">Home</div>
              </div>
            </Link>
            <Link to="/chats">
              <div className={path === "/chats" ? "text-indigo-300" : ""}>
                <FontAwesomeIcon icon={faUserSecret} size="lg" />
                <div className="mt-1">Chats</div>
              </div>
            </Link>
            <Link to="/mails">
              <div className={path === "/mails" ? "text-indigo-300" : ""}>
                <FontAwesomeIcon icon={faEnvelope} size="lg" />
                <div className="mt-1">Mails</div>
              </div>
            </Link>
            <Link to="/vault">
              <div className={path === "/vault" ? "text-indigo-300" : ""}>
                <FontAwesomeIcon icon={faVault} size="lg" />
                <div className="mt-1">Vault</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Structure;
