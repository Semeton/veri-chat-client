import React, { useEffect, useState } from "react";
import LoadingButton from "../components/buttons/LoadingButton";
import PrimaryButton from "../components/buttons/PrimaryButton";
import Structure from "../layout/Structure";
import { userDetails } from "../../lib/UserDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Http from "../../services/handlers/Http";
import { baseUrl } from "../../services/api/urls/Links";
import { Endpoints } from "../../services/api/urls/Endpoints";
import Alerts from "../../util/alerts/Alerts";
import User from "../../services/api/auth/User";

const Profile = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formdata, setFormdata] = useState<{
    username: string;
    name: string;
    email: string;
  }>({
    username: userDetails.username,
    name: userDetails.name,
    email: userDetails.email,
  });

  const http = Http.getInstance();
  const updateProfileUrl = baseUrl + Endpoints.update;

  useEffect(() => {
    const header = document.getElementById("headerLayout");
    if (header) {
      header.style.display = "none";
    }
  });

  const onHandleChange = (e: any) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const handleSubmit = (e: any) => {
    const user = new User();

    setLoading(true);
    e.preventDefault();
    const formData: FormData = new FormData();
    formData.append("username", formdata.username);
    formData.append("name", formdata.name);
    formData.append("email", formdata.email);

    http
      .post(updateProfileUrl, formData)
      .then((res) => {
        user.getUser();
        Alerts.success(res.message);
        setLoading(false);
      })
      .catch((e) => {
        let message = e.response?.data?.error ?? e.message;
        Alerts.error(message);
        setLoading(false);
      });
  };

  const page = (
    <div className="text-white">
      <div className="items-center mt-6">
        <div className="flex items-center justify-center text-center flex-row">
          <div className="text-indigo-500 rounded-full h-20 w-20 bg-gray-950 text-center justify-center flex items-center mr-4">
            <FontAwesomeIcon
              className="text-center mx-auto"
              icon={faUser}
              size="2xl"
            />
          </div>
        </div>

        <div className="mt-1 text-center">
          <h3 className="font-bold text-xl">{formdata.name}</h3>
          <p className="text-sm">{formdata.email}</p>
        </div>
      </div>
      <div className="mt-10 text-white w-full rounded-lg shadow bg-gray-800 border-gray-700">
        <div className="p-4 space-y-4">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-white">
            Personal Information
          </h1>
          <form
            method="POST"
            className="space-y-4 md:space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <input
                type="text"
                name="username"
                id="username"
                className="sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                placeholder="username"
                value={formdata.username}
                onChange={onHandleChange}
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="name"
                id="name"
                className="sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                placeholder="name"
                value={formdata.name}
                onChange={onHandleChange}
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                id="email"
                className="sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                placeholder="recipient email"
                value={formdata.email}
                onChange={onHandleChange}
                readOnly
                required
              />
            </div>
            {loading ? (
              <LoadingButton type="button" text="Processing..." />
            ) : (
              <PrimaryButton type="submit" text="Update" />
            )}
          </form>
        </div>
      </div>
      <Link to="/dashboard" className="text-center text-indigo-500 text-sm">
        <div className="text-center mt-6">Back Home</div>
      </Link>
    </div>
  );
  return <Structure page={page} />;
};

export default Profile;
