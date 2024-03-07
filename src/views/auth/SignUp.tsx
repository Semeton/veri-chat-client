import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import VerifyEmail from "./VerifyEmail";

const SignUp = () => {
  const [formdata, setFormdata] = useState<{
    name: string;
    email: string;
    password: string;
    cpassword: string;
  }>({ name: "", email: "", password: "", cpassword: "" });
  const [verify, setVerify] = useState<Boolean>(false);

  const onHandleChange = (e: any) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("clicked");
    setVerify(true);
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
                </div>
                <div>
                  <input
                    type="password"
                    name="cpassword"
                    id="cpassword"
                    placeholder="confirm password"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border-gray-300 border-gray-600 bg-gray-700 p-2.5 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={formdata.cpassword}
                    onChange={onHandleChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-800"
                >
                  Sign up
                </button>
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
