import React, { useState } from "react";
import Http from "../../../services/handlers/Http";
import { baseUrl } from "../../../services/api/urls/Links";
import { Endpoints } from "../../../services/api/urls/Endpoints";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
// import Loader from "../../components/Loader";
import DefaultModal from "../../components/modals/DefaultModal";
import LoadingButton from "../../components/buttons/LoadingButton";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import Alerts from "../../../util/alerts/Alerts";

const ChatQuickAccess = () => {
  // const [loading, setLoading] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);
  const [formdata, setFormdata] = useState<{ email: string }>({ email: "" });
  const http = Http.getInstance();
  const sendChatRequestUrl = baseUrl + Endpoints.receivedChatRequest;
  const navigate = useNavigate();

  const onHandleChange = (e: any) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const handleSubmit = (e: any) => {
    setSending(true);
    e.preventDefault();
    const data: FormData = new FormData();
    data.append("recipient_email", formdata.email);

    http
      .post(sendChatRequestUrl, data)
      .then((res) => {
        console.log(res);
        Alerts.success("Chat request sent successfully");
        setSending(false);
      })
      .catch((e) => {
        console.error(e);
        let message = e.response?.data?.error ?? e.message;
        Alerts.error(message);
        setSending(false);
      });
  };

  const sentRequest = () => {
    navigate("/sent-requests");
  };

  const styles =
    "bg-gray-800 p-3 rounded-md border border-gray-600 items-center";

  const title: string = "Send Chat Request";

  const newChat = (
    <div className={styles}>
      <div className="mb-2 mr-3 pt-1">
        <FontAwesomeIcon icon={faUserPlus} size="lg" />
      </div>
      Start New Chat
    </div>
  );

  const body = (
    <form
      method="POST"
      className="space-y-4 md:space-y-6"
      onSubmit={handleSubmit}
    >
      <div>
        <input
          type="email"
          name="email"
          id="email"
          className="ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-indigo-600 bg-gray-500 p-2.5 text-white placeholder-gray-400 focus:ring-blue-500 sm:text-sm"
          placeholder="email"
          value={formdata.email}
          onChange={onHandleChange}
          required
        />
      </div>
      {sending ? (
        <LoadingButton type="button" text="Sending..." />
      ) : (
        <PrimaryButton type="submit" text="Send Request" />
      )}
    </form>
  );

  return (
    <>
      {/* {loading && <Loader />} */}
      <div className="mb-5 mt-3">
        <div className="grid grid-cols-3 gap-3">
          <DefaultModal element={newChat} title={title} body={body} />
          <div className={styles} onClick={sentRequest}>
            <div className="mb-2 mr-3 pt-1">
              <FontAwesomeIcon icon={faUserSecret} size="lg" />
            </div>
            Sent Requests
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatQuickAccess;
