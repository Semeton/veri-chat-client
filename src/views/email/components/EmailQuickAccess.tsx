import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../components/Loader";

const EmailQuickAccess = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const chats = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/sent-emails");
    }, 1000);
  };
  const styles = "bg-gray-800 p-3 rounded-md border border-gray-600";

  return (
    <>
      {loading && <Loader />}
      <div className="mt-3 mb-5">
        <div className="grid grid-cols-3 gap-3">
          <div className={styles} onClick={chats}>
            <div className="mb-2">
              <FontAwesomeIcon icon={faUserSecret} size="lg" />
            </div>
            Sent Emails
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailQuickAccess;
