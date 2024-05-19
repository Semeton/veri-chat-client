import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Login from "../../services/api/auth/Login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import LoadingButton from "../components/buttons/LoadingButton";

const SignIn = () => {
  const [formdata, setFormdata] = useState<{ email: string; password: string }>(
    { email: "", password: "" },
  );
  const [loading, setLoading] = useState<boolean>(false);
  // const navigate = useNavigate();

  const onHandleChange = (e: any) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const handleSubmit = (e: any) => {
    setLoading(true);
    e.preventDefault();
    // setTimeout(() => {
    const credentials: FormData = new FormData();
    credentials.append("email", formdata.email);
    credentials.append("password", formdata.password);

    const login = new Login();
    login.attempt(credentials);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
                    className="block w-full rounded-lg border-gray-600 bg-gray-700 p-2.5 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Email"
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
                    placeholder="Password"
                    className="block w-full rounded-lg border-gray-600 bg-gray-700 p-2.5 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={formdata.password}
                    onChange={onHandleChange}
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="focus:ring-3 focus:ring-primary-600 h-4 w-4 rounded border-gray-600 bg-gray-700 ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="text-gray-300">Remember me</label>
                    </div>
                  </div>
                  <a
                    href="/forgot-password"
                    className="text-sm font-medium text-indigo-500 hover:underline"
                    hidden
                  >
                    Forgot password?
                  </a>
                </div>
                {loading ? (
                  <LoadingButton type="button" text="Signing in..." />
                ) : (
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-800"
                  >
                    Sign in
                  </button>
                )}

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-indigo-500 hover:underline"
                  >
                    Sign up
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

export default SignIn;
