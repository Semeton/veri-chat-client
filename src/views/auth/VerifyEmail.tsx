import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import VerificationInput from "react-verification-input";
import LoadingButton from "../components/buttons/LoadingButton";
import PrimaryButton from "../components/buttons/PrimaryButton";
import DisabledButton from "../components/buttons/DisabledButton";

const VerifyEmail: React.FC<{
  email: string;
}> = ({ email }) => {
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  // const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft === 0) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const onHandleChange = (e: any) => {
    // const { value } = e.target;
    setCode(e);
  };

  const handleSubmit = (e: any) => {
    setLoading(true);
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
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                Verify Your Email
              </h1>
              <form
                method="GET"
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit}
                id="verificationForm"
              >
                <p className="text-sm text-white">
                  Input the verification code sent to your email
                </p>
                <div className="my-3 flex items-center justify-center">
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
              <p className="text-center text-sm text-indigo-500">
                {timeLeft > 0
                  ? timeLeft + " seconds left"
                  : "Resend verification code"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VerifyEmail;
