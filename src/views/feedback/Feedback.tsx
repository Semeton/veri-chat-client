import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import LoadingButton from "../components/buttons/LoadingButton";
import Http from "../../services/handlers/Http";
import { baseUrl } from "../../services/api/urls/Links";
import { Endpoints } from "../../services/api/urls/Endpoints";
import Alerts from "../../util/alerts/Alerts";
import DisabledButton from "../components/buttons/DisabledButton";

const Feedback = () => {
  const [formdata, setFormdata] = useState<{ feedback: string }>({
    feedback: "",
  });
  const [errors, setErrors] = useState<{
    feedback: string;
  }>({
    feedback: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const http = Http.getInstance();
  const feedBackUrl = baseUrl + Endpoints.feedback;

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
    } else {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (e: any) => {
    setLoading(true);
    e.preventDefault();
    const data: FormData = new FormData();
    data.append("feedback", formdata.feedback);

    http
      .post(feedBackUrl, data)
      .then((res) => {
        Alerts.success(res.message);
        setFormdata({
          ...formdata,
          feedback: "",
        });
        setLoading(false);
      })
      .catch((e) => {
        let message = e.response?.data?.message ?? e.message;
        Alerts.error(message);
        setLoading(false);
      });
  };
  return (
    <div className="fixed left-0 right-0 top-0">
      <section className="bg-gray-900 overflow-y-scroll">
        <div className="mx-auto flex h-screen flex-col items-center justify-center px-6 py-8 lg:py-0">
          <Link
            to="/dashboard"
            className="mb-6 flex animate-bounce items-center text-2xl font-semibold text-whitetext-center text-indigo-500"
          >
            <FontAwesomeIcon
              icon={faUserSecret}
              size="xl"
              className="mr-2 text-indigo-600"
            />
          </Link>
          <div className="w-full rounded-lg border-gray-700 bg-gray-800 shadow sm:max-w-md md:mt-0 xl:p-0">
            <div className="p-6 sm:p-8 mb-4">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl mb-1">
                Have a complaint or feedback?
              </h1>
              <p className="text-white mb-4">
                Send an anonymous feedback below.
              </p>
              <form
                method="POST"
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit}
              >
                <div>
                  <textarea
                    name="feedback"
                    className="block w-full rounded-lg border-gray-600 bg-gray-700 p-2.5 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Type your feed back here"
                    rows={12}
                    value={formdata.feedback}
                    onChange={onHandleChange}
                    required
                  />
                  <p className="mt-1 text-xs text-red-300">{errors.feedback}</p>
                </div>
                {loading ? (
                  <LoadingButton type="button" text="Signing in..." />
                ) : formdata.feedback.length === 0 ? (
                  <DisabledButton text="Enter your feedback" />
                ) : (
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-800"
                  >
                    Submit Feedback
                  </button>
                )}
              </form>
            </div>
          </div>
          <Link to="/dashboard" className="text-center text-indigo-500 text-sm">
            <div className="text-center mt-6">Go Back Home</div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Feedback;
