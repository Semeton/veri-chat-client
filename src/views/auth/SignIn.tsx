import React, { useState } from "react";
import Login from "../../services/api/auth/Login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";

const SignIn = () => {
  const [formdata, setFormdata] = useState<{ email: string; password: string }>(
    { email: "", password: "" }
  );
  const [loading, setLoading] = useState<boolean>(false);

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
      credentials.append("password", formdata.password);

      const login = new Login();
      login.attempt(credentials);
      setLoading(false);
    }, 4000);
  };
  return (
    <div>
      <section className="bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <a
            href="/dashboard"
            className="flex items-center mb-6 text-2xl font-semibold text-white animate-bounce"
          >
            <FontAwesomeIcon
              icon={faUserSecret}
              size="lg"
              className="mr-2 text-indigo-600"
            />
            <b>VeriVault</b>
          </a>
          <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                Sign in to your account
              </h1>
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
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 rounded focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="text-gray-300">Remember me</label>
                    </div>
                  </div>
                  <a
                    href="/forgot-password"
                    className="text-sm font-medium hover:underline text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
                {loading ? (
                  <button
                    className="w-full text-white bg-indigo-300 hover:bg-indigo-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-indigo-800"
                    disabled
                  >
                    Signing in
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-indigo-800"
                  >
                    Sign in
                  </button>
                )}

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <a
                    href="/signup"
                    className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
