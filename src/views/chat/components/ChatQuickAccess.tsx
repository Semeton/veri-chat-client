import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../components/Loader";
import DefaultModal from "../../components/modals/DefaultModal";
import Login from "../../../services/api/auth/Login";
import LoadingButton from "../../components/buttons/LoadingButton";
import PrimaryButton from "../../components/buttons/PrimaryButton";

const ChatQuickAccess = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formdata, setFormdata] = useState<{ email: string }>({ email: "" });
  const navigate = useNavigate();

  const onHandleChange = (e: any) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const handleSubmit = (e: any) => {
    setLoading(true);
    e.preventDefault();
    setTimeout(() => {
      const credentials: FormData = new FormData();
      credentials.append("email", formdata.email);

      const login = new Login();
      login.attempt(credentials);
      setLoading(false);
    }, 4000);
  };
  const sentRequest = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/sent-requests");
    }, 1000);
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
          className="sm:text-sm rounded-lg border border-indigo-600 ring-primary-600 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-500 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          placeholder="email"
          value={formdata.email}
          onChange={onHandleChange}
          required
        />
      </div>
      {loading ? (
        <LoadingButton type="button" text="Processing..." />
      ) : (
        <PrimaryButton type="submit" text="Send Request" />
      )}
    </form>
  );

  return (
    <>
      {loading && <Loader />}
      <div className="mt-3 mb-5">
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
