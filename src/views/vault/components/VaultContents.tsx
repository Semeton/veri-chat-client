import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../components/Loader";
import Http from "../../../services/handlers/Http";
import { baseUrl } from "../../../services/api/urls/Links";
import { Endpoints } from "../../../services/api/urls/Endpoints";
import Alerts from "../../../util/alerts/Alerts";
import { useNavigate } from "react-router-dom";

const VaultContents: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [encryptedTexts, setEncryptedTexts] = useState([]);

  const navigate = useNavigate();
  const http = Http.getInstance();
  const encryptedTextsUrl = baseUrl + Endpoints.encryptText;
  const deleteEncrypTextUrl = baseUrl + Endpoints.deleteEncrypText;

  useEffect(
    () => {
      getEncryptedTexts();
    },
    // eslint-disable-next-line
    [],
  );

  const getEncryptedTexts = () => {
    setLoading(true);
    http
      .get(encryptedTextsUrl)
      .then((res) => {
        setEncryptedTexts(res);
        setLoading(false);
      })
      .catch((e) => {
        let message = e.response?.data?.message ?? e.message;
        Alerts.error(message);
        setLoading(false);
      });
  };

  const decryptText = (uuid: string) => {
    let secret: string | null = prompt("Enter chat secret keys:", "");
    if (secret === null) {
      alert("Canceled! No key entered.");
      return;
    }
    navigate("/vault-content/" + uuid + "/" + secret);
  };

  const deleteMessage = (uuid: string) => {
    if (
      window.confirm("Are you sure you want to delete this encyrpted message?")
    ) {
      http
        .get(deleteEncrypTextUrl + uuid)
        .then((res) => {
          getEncryptedTexts();
          Alerts.success(res.message);
        })
        .catch((e) => {
          let message = e.response?.data?.message ?? e.message;
          Alerts.error(message);
          setLoading(false);
        });
    }
  };

  const styles: string =
    "flex bg-gray-950 p-3 text-white rounded-md border border-gray-800 items-center justify-between mt-1";
  return (
    <div className="fixed right-0 left-0 bottom-0 top-0">
      {loading && <Loader />}
      <div className="flex flex-col h-screen justify-between bg-gray-900 text-white">
        <main className="mb-auto p-4 px-5">
          <div onClick={() => navigate("/vault")} className={"cursor-pointer"}>
            <FontAwesomeIcon icon={faArrowLeftLong} className="mr-3" />
            Back
          </div>
          <div className="mt-8 mb-5">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              Encrpted Texts
            </h1>
          </div>
          <div className="mt-3 overflow-y-scroll">
            {encryptedTexts.length === 0 && (
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
                <p className="">You do not have any encrypted text/document</p>
              </div>
            )}
            <div className="grid">
              {encryptedTexts.map((text) => (
                <div className={styles}>
                  <div
                    className="flex items-center"
                    onClick={() => decryptText((text as any).uuid)}
                  >
                    <FontAwesomeIcon
                      icon={faUserSecret}
                      size="2xl"
                      className="mr-3"
                    />
                    <div className="mr-2">
                      <p>{(text as any).title}</p>
                      <p className="text-sm text-indigo-500">
                        {(text as any).updated_at_hum}
                      </p>
                    </div>
                  </div>
                  <div
                    className="mr-2"
                    onClick={() => deleteMessage((text as any).uuid)}
                  >
                    <FontAwesomeIcon
                      className="text-red-500"
                      size="lg"
                      icon={faTimesCircle}
                    />
                  </div>
                  {/* <div className="mr-2">
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </div> */}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VaultContents;