import React, { useEffect, useState } from "react";
import Http from "../../services/handlers/Http";
import { Endpoints } from "../../services/api/urls/Endpoints";
import { baseUrl } from "../../services/api/urls/Links";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import VerificationInput from "react-verification-input";
import LoadingButton from "../components/buttons/LoadingButton";
import PrimaryButton from "../components/buttons/PrimaryButton";
import DisabledButton from "../components/buttons/DisabledButton";
import LocalStorageStore from "../../util/db/LocalStorageStore";
import Alerts from "../../util/alerts/Alerts";

const VerifyEmail: React.FC<{
  email: string;
}> = ({ email }) => {
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(20);
  const http = Http.getInstance();
  const verifyCodeUrl = baseUrl + Endpoints.verify + `/${code}`;
  const resendVerifyCodeUrl = baseUrl + Endpoints.verifyToken + `/${email}`;

  useEffect(() => {
    if (timeLeft === 0) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const onHandleChange = (e: any) => {
    setCode(e);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    http
      .get(verifyCodeUrl)
      .then((res) => {
        if (res.token) {
          LocalStorageStore.storeData({ token: res.token });
        }
        Alerts.success(res.message);
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2000);
      })
      .catch((e) => {
        let message = e.response?.data?.error ?? e.message;
        Alerts.error(message);
        setLoading(false);
      });
  };

  const resendVerificationCode = () => {
    http
      .get(resendVerifyCodeUrl)
      .then((res) => {
        Alerts.success(res.message);
        setLoading(false);
      })
      .catch((e) => {
        let message = e.response?.data?.error ?? e.message;
        Alerts.error(message);
        setLoading(false);
      });
  };

  return (
    <div className="fixed left-0 right-0 top-0">
      <section className="bg-gray-900">
        <div className="mx-auto flex h-screen flex-col items-center justify-center px-6 py-8 lg:py-0">
          <a
            href="/dashboard"
            className="mb-6 flex animate-bounce items-center text-2xl font-semibold text-white"
          >
            <FontAwesomeIcon
              icon={faUserSecret}
              size="lg"
              className="mr-2 text-indigo-600"
            />
            <b>VeriVault</b>
          </a>
          <div className="w-full rounded-lg border-gray-700 bg-gray-800 shadow sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-2 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                Verify Your Email
              </h1>
              <form
                method="GET"
                className="m-0 p-0"
                onSubmit={handleSubmit}
                id="verificationForm"
              >
                <p className="text-sm text-white">
                  Enter the verification code sent to your email
                </p>
                <div className="my-5 flex items-center justify-center">
                  <VerificationInput
                    length={6}
                    placeholder=""
                    classNames={{
                      container: "container",
                      character: "character",
                      characterInactive: "character--inactive",
                      characterSelected: "character--selected",
                    }}
                    onChange={onHandleChange}
                  />
                </div>
                {loading ? (
                  <LoadingButton type="button" text="Verifying..." />
                ) : code.length !== 6 ? (
                  <DisabledButton text="Enter Verification Code" />
                ) : (
                  <PrimaryButton type="submit" text="Verify Email" />
                )}
              </form>

              {timeLeft > 0 ? (
                <p className="text-center text-sm text-indigo-500">
                  {timeLeft + " seconds left"}
                </p>
              ) : (
                <p
                  className="text-center text-sm text-indigo-500"
                  onClick={resendVerificationCode}
                >
                  Resend verification code
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VerifyEmail;
