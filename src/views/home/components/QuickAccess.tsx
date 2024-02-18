import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret, faVault } from "@fortawesome/free-solid-svg-icons";

const QuickAccess = () => {
  const navigate = useNavigate();
  const chats = () => navigate("/chats");
  const vault = () => navigate("/vault");
  const styles = "bg-gray-800 p-3 rounded-md border border-gray-600";

  return (
    <div className="mt-3 mb-5">
      <div className="grid grid-cols-2 gap-3">
        <div className={styles} onClick={chats}>
          <div className="mb-2">
            <FontAwesomeIcon icon={faUserSecret} size="lg" />
          </div>
          <b>Secure Messaging</b>
          <p className="text-sm p-0">Zero-knowledge-proof encrypted messages</p>
        </div>
        <div className={styles} onClick={vault}>
          <div className="mb-2">
            <FontAwesomeIcon icon={faVault} size="lg" />
          </div>
          <b>Secure Vault</b>
          <p className="text-sm p-0">
            Encrypted sensitive data with secure secret
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuickAccess;
