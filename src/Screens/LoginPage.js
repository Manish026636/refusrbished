import React, { useEffect, useState } from "react";
import { clearErrors, userLogin } from "../actions/userActions";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Components/Loader/Loader";
import { captchaAction } from "../actions/captchaActions";
import { FaSpinner } from "react-icons/fa";
import { AiOutlineReload } from "react-icons/ai";
import { toast } from "react-toastify";
import logo from "../assets/aiumit.png";
const LoginPage = () => {
  const { loading, is_authenticated, error } = useSelector(
    (state) => state.user
  );
  const { captchaLoading, id, captcha_text } = useSelector(
    (state) => state.captcha
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const signdata = {
      email,
      password,
      captcha_id: id,
      captcha_answer: captcha,
    };
    dispatch(userLogin(signdata));
  };

  //captcha handle
  const handleReload = () => {
    dispatch(captchaAction());
  };
  useEffect(() => {
    if (error) {
      if (error?.error) toast.error(error.error);
      setTimeout(function () {
        dispatch(clearErrors());
      }, 5000);
    }

    if (is_authenticated) {
      toast.success("Login Successful");
      navigate("/me");
    }
    else{
      localStorage.removeItem('persist:root');

    }
  }, [error, is_authenticated, dispatch, navigate]);
  useEffect(() => {
    if (!captcha_text) {
      dispatch(captchaAction());
    }
  }, [captcha_text]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <section className="bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
                <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
                  <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                    Sign In
                  </h2>
                  <p className="mt-2 text-base text-gray-600">
                    Don’t have an account?{" "}
                    <Link
                      to="/register"
                      title=""
                      className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700"
                    >
                      Create Account
                    </Link>
                  </p>

                  <form action="#" method="POST" className=" mt-8">
                    <div className="space-y-5">
                      <div>
                        <label
                          htmlFor=""
                          className="text-base font-medium text-gray-900"
                        >
                          {" "}
                          Email address{" "}
                        </label>
                        <div className="mt-2.5">
                          <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email to get started"
                            className={`block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                              error?.email
                                ? "border-red-500"
                                : "border-gray-200"
                            }`}
                          />
                          {error?.email && (
                            <span className="text-red-500 font-thin my-1 lg:float-right">
                              {error.email}
                            </span>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor=""
                            className="text-base font-medium text-gray-900"
                          >
                            {" "}
                            Password{" "}
                          </label>
                        </div>
                        <div className="mt-2.5">
                          <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className={`block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                              error?.password
                                ? "border-red-500"
                                : "border-gray-200"
                            }`}
                          />
                          {error?.password && (
                            <span className="text-red-500 font-thin my-1 lg:float-right">
                              {error.password}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="mb-2 text-sm font-bold text-gray-700 tracking-wide">
                          Enter Captcha
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row justify-center items-center">
                        {captchaLoading ? (
                          <div className="flex-1 text-indigo-500 text-lg">
                            <FaSpinner className="animate-spin" />
                          </div>
                        ) : (
                          captcha_text && (
                            <div className="flex flex-row justify-between items-center flex-1 mr-2 w-1/2 lg:w1/3">
                              <img
                                className="h-14"
                                src={captcha_text}
                                alt="Captcha"
                              />
                              <AiOutlineReload
                                onClick={handleReload}
                                title="Reload Captcha"
                                className="cursor-pointer text-lg text-indigo-500 font-bold"
                              />
                            </div>
                          )
                        )}
                        <input
                          className={`w-full text-lg flex-1 py-2 border p-3 focus:outline-none bg-white  text-black focus:border-indigo-500 rounded-lg ${
                            error?.captcha_answer
                              ? "border-red-500"
                              : "border-black"
                          }`}
                          type="text"
                          placeholder="Enter Captcha"
                          onChange={(e) => setCaptcha(e.target.value)}
                          value={captcha}
                        />
                      </div>
                      {error?.captcha_answer && (
                        <span className="text-red-500 font-thin my-1 lg:float-right">
                          {error.captcha_answer}
                        </span>
                      )}
                      <div>
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
                          onClick={handleSubmit}
                        >
                          Log In
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="flex items-center justify-center    lg:h-screen px-4 py-10 sm:py-16 lg:py-24 sm:px-6 lg:px-8">
                <div>
                  <img className="w-1/2 mx-auto" src={logo} alt="aimut logo" />

                  <div className="w-full max-w-md mx-auto xl:max-w-xl">
                    <h3 className="text-2xl font-bold text-transparent py-8 bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-center">
                      AIMUN x MUNITY
                    </h3>

                    <div className="flex items-center justify-center mt-2 space-x-3">
                      <div className="bg-orange-500 rounded-full w-20 h-1.5"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default LoginPage;
