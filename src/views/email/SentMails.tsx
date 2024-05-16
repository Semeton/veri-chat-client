import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import Loader from "../components/Loader";
import Alerts from "../../util/alerts/Alerts";
import { baseUrl } from "../../services/api/urls/Links";
import { Endpoints } from "../../services/api/urls/Endpoints";
import Http from "../../services/handlers/Http";

const SentMails: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [encryptedEmails, setEncryptedEmails] = useState([]);

  const http = Http.getInstance();
  const encryptedEmailsUrl = baseUrl + Endpoints.email;

  useEffect(
    () => {
      getEncryptedEmails();
    },
    // eslint-disable-next-line
    [],
  );

  const getEncryptedEmails = () => {
    setLoading(true);
    http
      .get(encryptedEmailsUrl)
      .then((res) => {
        setEncryptedEmails(res);
        setLoading(false);
      })
      .catch((e) => {
        let message = e.response?.data?.message ?? e.message;
        Alerts.error(message);
        setLoading(false);
      });
  };

  const styles: string =
    "flex bg-gray-950 p-3 text-white rounded-md border border-gray-800 items-center justify-between mt-1";
  return (
    <div className="fixed right-0 left-0 bottom-0 top-0">
      {loading && <Loader />}
      <div className="flex flex-col h-screen justify-between bg-gray-900 text-white">
        <main className="mb-auto p-4 px-5 overflow-y-scroll">
          <div className="grid grid-cols-3 justify-between text-white items-center mb-5 mt-2">
            <div
              onClick={() => window.history.back()}
              className={"cursor-pointer"}
            >
              <FontAwesomeIcon icon={faArrowLeftLong} />
            </div>
            <div className="col-span-2">
              <h1 className="text-lg font-bold leading-tight tracking-tight md:text-2xl text-white">
                Sent Emails
              </h1>
            </div>
          </div>
          <div className="mt-5 overflow-y-scroll">
            {encryptedEmails.length === 0 && (
              <div className="text-center">
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
              </div>
            )}
            <div className="grid">
              {encryptedEmails.map((email) => (
                <div className={styles}>
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faUserSecret}
                      size="2xl"
                      className="mr-3"
                    />
                    <div className="mr-2">
                      <p>{(email as any).subject}</p>
                      <p className="text-sm text-indigo-500">
                        {(email as any).created_at_hum}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SentMails;
