import React, { useState } from "react";
import Login from "../../services/api/auth/Login";
import LoadingButton from "../components/buttons/LoadingButton";
import PrimaryButton from "../components/buttons/PrimaryButton";
import Structure from "../layout/Structure";
import EmailQuickAccess from "./components/EmailQuickAccess";

const Email = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formdata, setFormdata] = useState<{
    subject: string;
    email: string;
    body: string;
    secret: string;
  }>({
    subject: "",
    email: "",
    body: "",
    secret: ""
  });

  const onHandleChange = (e: any) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const handleSubmit = (e: any) => {
    setLoading(true);
    e.preventDefault();
    setTimeout(() => {
      const credentials: FormData = new FormData();
      credentials.append("subject", formdata.subject);
      credentials.append("email", formdata.email);
      credentials.append("body", formdata.body);

      const login = new Login();
      login.attempt(credentials);
      setLoading(false);
    }, 4000);
  };

  const page = (
    <div className="text-white">
      <EmailQuickAccess />
      <div className="mt-10 text-white w-full rounded-lg shadow bg-gray-800 border-gray-700">
        <div className="p-4 space-y-4">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-white">
            Send Encrypted mail
          </h1>
          <form
            method="POST"
            className="space-y-4 md:space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <input
                type="subject"
                name="subject"
                id="subject"
                className="border-gray-300 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                placeholder="subject"
                value={formdata.subject}
                onChange={onHandleChange}
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                id="email"
                className="border-gray-300 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                placeholder="recipient email"
                value={formdata.email}
                onChange={onHandleChange}
                required
              />
            </div>
            <div>
              <textarea
                name="body"
                id="emailBody"
                className="border-gray-300 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                cols={30}
                rows={7}
                onChange={onHandleChange}
                required
              >
                {formdata.body}
              </textarea>
            </div>
            <div>
              <input
                type="secret"
                name="secret"
                id="secret"
                className="border-gray-300 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                placeholder="secret"
                value={formdata.secret}
                onChange={onHandleChange}
                required
              />
            </div>
            {loading ? (
              <LoadingButton type="button" text="Processing..." />
            ) : (
              <PrimaryButton type="submit" text="Send Email" />
            )}
          </form>
        </div>
      </div>
    </div>
  );
  return <Structure page={page} />;
};

export default Email;
