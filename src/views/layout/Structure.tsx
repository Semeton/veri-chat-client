import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faVault } from "@fortawesome/free-solid-svg-icons";
import Header from "./Header";

interface StructureProps {
  page: React.ReactNode;
}

const Structure: React.FC<StructureProps> = ({ page }) => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="fixed">
      <div className="flex flex-col h-screen justify-between bg-gray-900">
        <Header />
        <main id="main" className="mb-auto p-3 px-5 overflow-y-scroll">
          {page}
        </main>
        <div className="h-20 bottom-0 bg-gray-950 w-screen pt-3">
          <div className="flex items-center justify-around text-center text-sm text-white">
            <Link to="/dashboard">
              <div className={path === "/dashboard" ? "text-indigo-500" : ""}>
                <FontAwesomeIcon icon={faHouse} size="lg" />
                <div className="mt-1">Home</div>
              </div>
            </Link>
            <Link to="/chats">
              <div className={path === "/chats" ? "text-indigo-500" : ""}>
                <FontAwesomeIcon icon={faUserSecret} size="lg" />
                <div className="mt-1">Chats</div>
              </div>
            </Link>
            <Link to="/emails">
              <div className={path === "/emails" ? "text-indigo-500" : ""}>
                <FontAwesomeIcon icon={faEnvelope} size="lg" />
                <div className="mt-1">Mails</div>
              </div>
            </Link>
            <Link to="/vault">
              <div className={path === "/vault" ? "text-indigo-500" : ""}>
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
