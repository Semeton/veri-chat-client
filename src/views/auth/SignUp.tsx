import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../../services/api/auth/Login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";

const SignUp = () => {
  const [formdata, setFormdata] = useState<{
    name: string;
    email: string;
    password: string;
    cpassword: string;
  }>({ name: "", email: "", password: "", cpassword: "" });

  const onHandleChange = (e: any) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const credentials: FormData = new FormData();
    credentials.append("email", formdata.email);
    credentials.append("password", formdata.password);

    const login = new Login();
    console.log(login.attempt(credentials));
  };
  return (
    <div className="fixed top-0 left-0 right-0">
      <section className="bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <a
            href="/home"
            className="flex items-center mb-6 text-2xl font-semibold text-white animate-bounce"
          >
            <FontAwesomeIcon
              icon={faUserSecret}
              className="mr-2 text-indigo-500"
            />
            VeriVault
          </a>
          <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="firstname lastname"
                    value={formdata.email}
                    onChange={onHandleChange}
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
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
                    className="border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
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
                    className="border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    value={formdata.cpassword}
                    onChange={onHandleChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-indigo-800"
                >
                  Sign up
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Have an account?{" "}
                  <Link
                    to="/signin"
                    className="font-medium hover:underline text-indigo-500"
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
