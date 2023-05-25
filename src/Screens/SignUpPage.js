import React, { Fragment, useEffect, useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, userRegistration } from "../actions/userActions";
import Loader from "../Components/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { captchaAction } from "../actions/captchaActions";
import { FaSpinner } from "react-icons/fa";
import { AiOutlineReload } from "react-icons/ai";
import { toast } from "react-toastify";
import logo from "../assets/aiumit.png";
import { countryCode2Name } from "../Components/CountriesName/countryCode2Name";
import { showErrors } from "../Components/Tabs/Utilities/errorShow";

const SignUpPage = () => {
  const { loading, is_authenticated, error } = useSelector(
    (state) => state.user
  );
  const { captchaLoading, id, captcha_text } = useSelector(
    (state) => state.captcha
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [validation, setValidation] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      password,
      confirmPassword,
      phone,
      gender,
      address,
      country :countryCode2Name[country.trim().toUpperCase()],
      captcha_id: id,
      captcha_answer: captcha,
    };
    if (password.length === 0) {
      return setValidation({
        password: "Enter Password",
      });
    }
    if (password !== confirmPassword) {
      return setValidation({
        confirmPassword: "Password and confirm password doesn't match",
      });
    }
    if (agreeTerms === false) {
      return setValidation({
        agree: "Please agree to terms and conditions",
      });
    }
    dispatch(userRegistration(userData));
  };

  //handle captcha
  const handleReload = () => {
    dispatch(captchaAction());
  };
  useEffect(() => {
    if (error) {
      // console.log(error)
      if (error?.error) toast.error(error.error);
      setTimeout(function () {
        dispatch(clearErrors());
      }, 5000);
    }
    if (is_authenticated) {
      showErrors("Registration Successful", true, "regSuccess");
      navigate("/me");
    }
  }, [error, is_authenticated, dispatch, navigate]);
  useEffect(() => {
    if (!captcha_text) {
      dispatch(captchaAction());
    }
  }, [captcha_text, dispatch]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <section className="bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-10">
                <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
                  <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                    Sign up
                  </h2>
                  <p className="mt-2 text-base text-gray-600">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      title=""
                      className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700"
                    >
                      Login
                    </Link>
                  </p>

                  <form onSubmit={handleSubmit} className="mt-8">
                    <div className="space-y-5">
                      <div>
                        <label
                          htmlFor="name"
                          className="text-base font-medium text-gray-900"
                        >
                          {" "}
                          Full Name{" "}
                        </label>
                        <div className="mt-2.5">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your full name"
                            className={`block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                              error?.name ? "border-red-500" : "border-gray-200"
                            }`}
                          />
                        </div>
                        {error?.name &&
                          error.name.map((err, i) => (
                            <span
                              className="text-red-500 font-thin my-2"
                              key={i}
                            >
                              {err}
                            </span>
                          ))}
                      </div>

                      <div>
                        <label
                          htmlFor="email"
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
                            placeholder="Enter email to get started"
                            className={`block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                              error?.email
                                ? "border-red-500"
                                : "border-gray-200"
                            }`}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        {error?.email &&
                          error.email.map((err, i) => (
                            <span
                              className="text-red-500 font-thin my-2"
                              key={i}
                            >
                              {err}
                            </span>
                          ))}
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="text-base font-medium text-gray-900"
                        >
                          Phone Number
                        </label>
                        <div className="mt-2.5">
                          <input
                            type="number"
                            name="phone"
                            id="phone"
                            placeholder="Enter phone number"
                            className={`block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                              error?.phone
                                ? "border-red-500"
                                : "border-gray-200"
                            }`}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                        {error?.phone &&
                          error.phone.map((err, i) => (
                            <span
                              className="text-red-500 font-thin my-2"
                              key={i}
                            >
                              {err}
                            </span>
                          ))}
                      </div>

                      <div>
                        <label
                          htmlFor="gender"
                          className="text-base font-medium  text-gray-900"
                        >
                          Gender
                        </label>
                        <select
                          className={`block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                            error?.gender ? "border-red-500" : "border-gray-200"
                          }`}
                          id="gender"
                          onClick={(e) => setGender(e.target.value)}
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                        {error?.gender && (
                          <span className="text-red-500 font-thin my-2">
                            Please select gender
                          </span>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="address"
                          className="text-base font-medium text-gray-900"
                        >
                          Address
                        </label>
                        <div className="mt-2.5">
                          <input
                            type="text"
                            name="address"
                            id="address"
                            placeholder="Enter address"
                            className={`block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                              error?.address
                                ? "border-red-500"
                                : "border-gray-200"
                            }`}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                        {error?.address &&
                          error.address.map((err, i) => (
                            <span
                              className="text-red-500 font-thin my-2"
                              key={i}
                            >
                              {err}
                            </span>
                          ))}
                      </div>
                      <div>
                        <label
                          htmlFor="country"
                          className="text-base font-medium text-gray-900"
                        >
                          Country
                        </label>
                        <ReactFlagsSelect
                          selected={country}
                          onSelect={(code) => setCountry(code)}
                          defaultCountry="IN"
                          searchable={true}
                          className={`block w-full text-black placeholder-gray-500 transition-all duration-200 border rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                            error?.country
                              ? "border-red-500"
                              : "border-gray-200"
                          }`}
                          searchPlaceholder="Search for a country"
                        />
                        {error?.country &&
                          error.country.map((err, i) => (
                            <span
                              className="text-red-500 font-thin my-2"
                              key={i}
                            >
                              {err}
                            </span>
                          ))}
                      </div>
                      <div>
                        <label
                          htmlFor="password"
                          className="text-base font-medium text-gray-900"
                        >
                          {" "}
                          Password{" "}
                        </label>
                        <div className="mt-2.5">
                          <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            className={`block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                              validation?.password
                                ? "border-red-500"
                                : "border-gray-200"
                            }`}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        {validation?.password && (
                          <span className="text-red-500 my-2 font-thin">
                            {validation.password}
                          </span>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="confirmPassword"
                          className="text-base font-medium text-gray-900"
                        >
                          {" "}
                          Confirm Password{" "}
                        </label>
                        <div className="mt-2.5">
                          <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Enter your password again"
                            className={`block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${
                              validation?.confirmPassword
                                ? "border-red-500"
                                : "border-gray-200"
                            }`}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                        {validation?.confirmPassword && (
                          <span className="text-red-500 my-2 font-thin">
                            {validation.confirmPassword}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="agree"
                          id="agree"
                          defaultChecked={agreeTerms}
                          className="w-5 h-5 text-blue-600 bg-white border-gray-200 rounded"
                          onChange={() => setAgreeTerms(!agreeTerms)}
                        />

                        <label
                          htmlFor="agree"
                          className="ml-3 text-sm font-medium text-gray-500"
                        >
                          I agree to Munity's{" "}
                          <Link
                            href="/terms"
                            title=""
                            className="text-blue-600 hover:text-blue-700 hover:underline"
                          >
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link
                            href="/privacy-policy"
                            title=""
                            className="text-blue-600 hover:text-blue-700 hover:underline"
                          >
                            Privacy Policy
                          </Link>
                        </label>
                      </div>
                        {validation?.agree && (
                          <span className="text-red-500 my-2 font-thin">
                            {validation.agree}
                          </span>
                        )}
                      <div className="flex -mx-3">
                        <div className="w-full px-3 mb-3">
                          <label
                            htmlFor="captcha"
                            className="text-sm text-gray-800 font-semibold px-1"
                          >
                            Enter Captcha
                          </label>
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
                                    className="cursor-pointer text-lg text-indigo-500 font-bold mr-2"
                                  />
                                </div>
                              )
                            )}
                            <input
                              className={`w-full text-lg flex-1 py-2 border p-3 focus:outline-none bg-white text-black focus:border-indigo-500 rounded-lg ${
                                error?.captcha_answer
                                  ? "border-red-500"
                                  : "border-gray-500"
                              }`}
                              type="text"
                              id="captcha"
                              placeholder="Enter the text showing"
                              onChange={(e) => setCaptcha(e.target.value)}
                              value={captcha}
                            />
                          </div>
                          {error?.captcha_answer &&
                            error.captcha_answer?.map((err, i) => (
                              <span
                                className="text-red-500 font-thin my-2 text-center lg:float-right"
                                key={i}
                              >
                                {err}
                              </span>
                            ))}
                        </div>
                      </div>

                      <div>
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
                        >
                          Create Account
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="flex items-center justify-center    lg:h-screen px-4 py-10 sm:py-16 lg:py-24 sm:px-6 lg:px-8">
                <div>
                  <img className="w-1/2 mx-auto" src={logo} alt="aiumit logo" />

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
    </Fragment>
  );
};

export default SignUpPage;
