import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Structure from "../../layout/Structure";
import LoadingButton from "../../components/buttons/LoadingButton";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import DisabledButton from "../../components/buttons/DisabledButton";
import Http from "../../../services/handlers/Http";
import { Endpoints } from "../../../services/api/urls/Endpoints";
import { baseUrl } from "../../../services/api/urls/Links";
import Alerts from "../../../util/alerts/Alerts";

const ChangePassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formdata, setFormdata] = useState<{
    old_password: string;
    new_password: string;
    confirm_new_password: string;
  }>({
    old_password: "",
    new_password: "",
    confirm_new_password: "",
  });
  const [errors, setErrors] = useState<{
    old_password: string;
    new_password: string;
    confirm_new_password: string;
  }>({
    old_password: "",
    new_password: "",
    confirm_new_password: "",
  });

  const http = Http.getInstance();
  const updatePasswordUrl = baseUrl + Endpoints.updatePassword;

  useEffect(() => {
    const header = document.getElementById("headerLayout");
    if (header) {
      header.style.display = "none";
    }
  });

  const navigate = useNavigate();

  const goBack = () => {
    window.history.back();
  };

  const onHandleChange = (e: any) => {
    const { name, value } = e.target;
    validateInput(name, value);
    setFormdata({ ...formdata, [name]: value });
  };

  const validateInput = (name: string, value: string) => {
    if (value === "") {
      let err = name
        .split("_")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" ");
      setErrors({ ...errors, [name]: err + " cannot be empty" });
    } else if (name === "new_password" && value.length < 8) {
      setErrors({
        ...errors,
        [name]: "New password must be at least 8 characters",
      });
    } else if (
      name === "confirm_new_password" &&
      value !== formdata.new_password
    ) {
      setErrors({
        ...errors,
        [name]: "Password confirmation must match new password",
      });
    } else {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    const data: FormData = new FormData();
    data.append("old_password", formdata.old_password);
    data.append("new_password", formdata.new_password);
    data.append("new_password_confirmation", formdata.confirm_new_password);

    http
      .post(updatePasswordUrl, data)
      .then((res) => {
        Alerts.success(res.message);
        setLoading(false);
        navigate("/settings");
      })
      .catch((e) => {
        let message = e.response?.data?.error ?? e.message;
        Alerts.error(message);
        setLoading(false);
      });
  };

  const page = (
    <div>
      <div>
        <div className="flex flex-col justify-between bg-gray-900 text-white">
          <div className="grid grid-cols-3 justify-between text-white items-center mb-5 mt-2">
            <div onClick={goBack} className={"cursor-pointer"}>
              <FontAwesomeIcon icon={faArrowLeftLong} />
            </div>
            <div className="col-span-2">
              <h1 className="text-lg font-bold leading-tight tracking-tight md:text-2xl text-white">
                Change Password
              </h1>
            </div>
          </div>
          <div className="mt-5 overflow-y-scroll">
            <form
              method="POST"
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit}
            >
              <div>
                <input
                  type="password"
                  name="old_password"
                  id="old_password"
                  className="sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                  placeholder="Enter old password"
                  value={formdata.old_password}
                  onChange={onHandleChange}
                  required
                />
                <p className="mt-1 text-xs text-red-300">
                  {errors.old_password}
                </p>
              </div>
              <div>
                <input
                  type="password"
                  name="new_password"
                  id="new_password"
                  className="sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                  placeholder="Enter new password"
                  value={formdata.new_password}
                  onChange={onHandleChange}
                  required
                />
                <p className="mt-1 text-xs text-red-300">
                  {errors.new_password}
                </p>
              </div>
              <div>
                <input
                  type="password"
                  name="confirm_new_password"
                  id="confirm_new_password"
                  className="sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                  placeholder="Enter new password again"
                  value={formdata.confirm_new_password}
                  onChange={onHandleChange}
                  required
                />
                <p className="mt-1 text-xs text-red-300">
                  {errors.confirm_new_password}
                </p>
              </div>
              {loading ? (
                <LoadingButton type="button" text="Processing..." />
              ) : formdata.old_password.length === 0 ||
                formdata.new_password.length === 0 ||
                formdata.confirm_new_password.length === 0 ||
                errors.old_password.length > 0 ||
                errors.new_password.length > 0 ||
                errors.confirm_new_password.length > 0 ? (
                <DisabledButton text="Fill all inputs correctly" />
              ) : (
                <PrimaryButton type="submit" text="Update Password" />
              )}
            </form>
          </div>
          <Link to="/dashboard" className="text-center text-indigo-500 text-sm">
            <div className="text-center mt-6">Back Home</div>
          </Link>
        </div>
      </div>
    </div>
  );

  return <Structure page={page} />;
};

export default ChangePassword;
