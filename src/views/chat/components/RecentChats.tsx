import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Http from "../../../services/handlers/Http";
import { baseUrl } from "../../../services/api/urls/Links";
import { Endpoints } from "../../../services/api/urls/Endpoints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import Alerts from "../../../util/alerts/Alerts";
import BarLoader from "../../components/BarLoader";
import Swal from "sweetalert2";

const RecentChats: React.FC = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [chats, setChats] = useState([]);
  const http = Http.getInstance();
  const chatUrl = baseUrl + Endpoints.chats;
  const chatSecretUrl = baseUrl + Endpoints.chatSecret;

  const navigate = useNavigate();

  useEffect(
    () => {
      getChats();
    },
    // eslint-disable-next-line
    [],
  );

  const styles: string =
    "flex bg-gray-950 p-3 rounded-md border border-gray-800 items-center justify-between mt-1";

  const getChats = () => {
    setLoading(true);
    http
      .get(chatUrl)
      .then((res) => {
        setChats(res);
        setLoading(false);
      })
      .catch((e) => {
        let message = e.response?.data?.message ?? e.message;
        Alerts.error(message);
        setLoading(false);
      });
  };

  const openChat = async (lock: string | null, uuid: string) => {
    if (lock === null) {
      Swal.fire({
        text: "You need to set a chat secret first",
        icon: "info",
        iconColor: "#6366f1",
        showCancelButton: true,
        color: "#fff",
        confirmButtonColor: "#6366f1",
        cancelButtonColor: "#d33",
        confirmButtonText: "Okay",
      }).then((result) => {
        if (result.isConfirmed) {
          setChatSecret(uuid);
        }
      });
    } else {
      let { value: secret } = await Swal.fire({
        // title: "Enter chat secret",
        input: "password",
        color: "#fff",
        inputLabel: "Enter chat secret",
        inputPlaceholder: "Enter chat secret",
        confirmButtonColor: "rgb(79 70 229)",
        inputAttributes: {
          maxlength: "10",
          autocapitalize: "off",
          autocorrect: "off",
        },
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value === null || value === "") {
              resolve("Secret cannot be blank.");
            } else {
              resolve();
            }
          });
        },
      });
      if (!secret) {
        Alerts.info("Secret was not entered.");
        return;
      }
      if (secret && secret.length > 0) {
        navigate("/chatview/" + uuid + "/" + secret);
      }
    }
  };

  const setChatSecret = async (uuid: string) => {
    let { value: secret } = await Swal.fire({
      // title: "Set chat secret",
      input: "password",
      inputLabel: "Set chat secret",
      inputPlaceholder: "Enter chat secret",
      confirmButtonColor: "rgb(79 70 229)",
      inputAttributes: {
        maxlength: "10",
        autocapitalize: "off",
        autocorrect: "off",
      },
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value === null || value === "") {
            resolve("Canceled! Secret was cannot be empty.");
          } else if (value.length < 6) {
            resolve(
              "Secret must be at least 6 characters and cannot be empty.",
            );
          } else {
            resolve();
          }
        });
      },
    });
    if (!secret) {
      Alerts.info("Secret was not set.");
      return;
    }
    if (secret) {
      let { value: csecret } = await Swal.fire({
        // title: "Confirm chat secret",
        input: "password",
        inputLabel: "Chat secret",
        inputPlaceholder: "Confirm chat secret",
        confirmButtonColor: "rgb(79 70 229)",
        inputAttributes: {
          maxlength: "10",
          autocapitalize: "off",
          autocorrect: "off",
        },
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value === null || value === "") {
              resolve("Secret was not confirmed");
            } else if (value !== secret) {
              resolve("Confirm secret must match secret");
            } else if (value === secret) {
              resolve();
            }
          });
        },
      });

      if (!csecret || csecret !== secret) {
        Alerts.error("Chat secret was not confirmed. Try again later.");
        return;
      }
    }

    const data: FormData = new FormData();
    data.append("chat_secret", secret);

    http
      .post(chatSecretUrl + uuid, data)
      .then((res) => {
        Alerts.success("Chat secret set successfully");
        setLoading(false);
        getChats();
      })
      .catch((e) => {
        let message = e.response?.data?.message ?? e.message;
        Alerts.error(message);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-72">
      {loading ? (
        <BarLoader />
      ) : chats.length === 0 ? (
        <div className="mt-10 text-center text-white">
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
          <p className="text-sm text-indigo-500">Send a chat request</p>
        </div>
      ) : (
        <div className="grid">
          {chats.map((chat) => (
            <div
              className={styles}
              onClick={() =>
                openChat(
                  (chat as any).role === "sender"
                    ? (chat as any).sender_secret
                    : (chat as any).recipient_secret,
                  (chat as any).uuid,
                )
              }
            >
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faUserSecret}
                  size="2xl"
                  className="mr-3"
                />
                <div className="mr-2">
                  <p>{(chat as any).other.name}</p>
                </div>
              </div>
              <div className="mr-2">
                <p className="text-xs text-green-500">NEW</p>
                {/* <FontAwesomeIcon icon={faEllipsisVertical} /> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentChats;
