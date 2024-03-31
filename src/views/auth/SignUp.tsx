import React, { useState } from "react";
import { Endpoints } from "../../services/api/urls/Endpoints";
import { baseUrl } from "../../services/api/urls/Links";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import VerifyEmail from "./VerifyEmail";
import LoadingButton from "../components/buttons/LoadingButton";
import DisabledButton from "../components/buttons/DisabledButton";
import PrimaryButton from "../components/buttons/PrimaryButton";
import Http from "../../services/handlers/Http";
import Alerts from "../../util/alerts/Alerts";

const SignUp = () => {
  const [formdata, setFormdata] = useState<{
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    terms: string;
  }>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    terms: "",
  });
  const [errors, setErrors] = useState<{
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    terms: string;
  }>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    terms: "",
  });
  const [verify, setVerify] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);
  const http = Http.getInstance();
  const registerUrl = baseUrl + Endpoints.register;

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
    } else if (
      name === "email" &&
      !value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
    ) {
      setErrors({
        ...errors,
        [name]: "Please enter a valid email address",
      });
    } else if (name === "password" && value.length < 8) {
      setErrors({
        ...errors,
        [name]: "Password must be at least 8 characters",
      });
    } else if (
      name === "password_confirmation" &&
      value !== formdata.password
    ) {
      setErrors({
        ...errors,
        [name]: "Password confirmation must match password",
      });
    } else {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (formdata.terms === "") {
      setErrors({
        ...errors,
        terms: "Terms must be accepted",
      });
      return;
    }
    setLoading(true);

    const data: FormData = new FormData();
    data.append("name", formdata.name);
    data.append("email", formdata.email);
    data.append("password", formdata.password);
    data.append("password_confirmation", formdata.password);
    data.append("terms", "accepted");

    http
      .post(registerUrl, data)
      .then((res) => {
        Alerts.success(res.message);
        setTimeout(() => {
          setVerify(true);
        }, 2000);
      })
      .catch((e) => {
        console.log(e);
        let message = e.response?.data?.message ?? e.message;
        Alerts.error(message);
        setLoading(false);
      });
  };

  if (verify) {
    return <VerifyEmail email={formdata.email} />;
  }

  return (
    <div className="fixed left-0 right-0 top-0">
      <section className="bg-gray-900">
        <div className="mx-auto flex h-screen flex-col items-center justify-center px-6 py-8 lg:py-0">
          <a
            href="/home"
            className="mb-6 flex animate-bounce items-center text-2xl font-semibold text-white"
          >
            <FontAwesomeIcon
              icon={faUserSecret}
              className="mr-2 text-indigo-500"
            />
            VeriVault
          </a>
          <div className="w-full rounded-lg border-gray-700 bg-gray-800 shadow sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border-gray-300 bg-gray-700 p-2.5 text-white placeholder-gray-400 sm:text-sm"
                    placeholder="firstname lastname"
                    value={formdata.name}
                    onChange={onHandleChange}
                    required
                  />
                  <p className="mt-1 text-xs text-red-300">{errors.name}</p>
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border-gray-500 bg-gray-700 p-2.5 text-white placeholder-gray-400 sm:text-sm"
                    placeholder="email"
                    value={formdata.email}
                    onChange={onHandleChange}
                    required
                  />
                  <p className="mt-1 text-xs text-red-300">{errors.email}</p>
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border-gray-500 bg-gray-700 p-2.5 text-white placeholder-gray-400 sm:text-sm"
                    value={formdata.password}
                    onChange={onHandleChange}
                    required
                  />
                  <p className="mt-1 text-xs text-red-300">{errors.password}</p>
                </div>
                <div>
                  <input
                    type="password"
                    name="password_confirmation"
                    id="password_confirmation"
                    placeholder="confirm password"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border-gray-600 bg-gray-700 p-2.5 text-white placeholder-gray-400 sm:text-sm"
                    value={formdata.password_confirmation}
                    onChange={onHandleChange}
                    required
                  />
                  <p className="mt-1 text-xs text-red-300">
                    {errors.password_confirmation}
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="focus:ring-3 focus:ring-primary-600 h-4 w-4 rounded border-gray-600 bg-gray-700 ring-offset-gray-800"
                      value={formdata.terms}
                      onChange={(e: any) => {
                        setFormdata({ ...formdata, terms: "accepted" });
                      }}
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="text-gray-300">
                      Accept{" "}
                      <a
                        href="https://verivault.xyz"
                        className="text-indigo-500"
                      >
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                </div>
                {loading ? (
                  <LoadingButton type="button" text="Processing..." />
                ) : errors.name.length > 0 ||
                  errors.email.length > 0 ||
                  errors.password.length > 0 ||
                  errors.password_confirmation.length > 0 ? (
                  <DisabledButton text="Fill all inputs correctly" />
                ) : (
                  <PrimaryButton type="submit" text="Register" />
                )}
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Have an account?{" "}
                  <Link
                    to="/signin"
                    className="font-medium text-indigo-500 hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
