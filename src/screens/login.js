import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import ThreeDot from "../components/ThreeDots";
import { loginHandler, LOGIN_FAILED } from "../redux/actions";

const Login = (props) => {
  const navigate = useNavigate();
  const { loginHandlerAction, loading_Login_Handler } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);


//   From I am dispatching the Login Handler function
  const handleSubmit = () => {
    setError(false);
    loginHandlerAction(email, password).then((res) => {
      console.log(res, "Data");
      if (res.type == LOGIN_FAILED) {
        setError(true);
        setErrorText(res.data);
      } else {
        navigate("/employee");
      }
    });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {/* Login Credentials */}
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
            Log In
          </h2>
          <p className="mb-4 text-center text-gray-600">
            Enter credentials to get access
          </p>
          {/*  */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-50"
              value={email}
              onChange={(e) => {
                setError(false);
                setEmail(e.target.value);
              }}
              placeholder="Enter email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-50"
              value={password}
              placeholder="Enter password"
              onChange={(e) => {
                setError(false);
                setPassword(e.target.value);
              }}
            />
          </div>
          {error && <p className="text-red-500 mb-4">{errorText}</p>}
          <label class="flex items-center mb-6">
            <input
              type="checkbox"
              class="form-checkbox h-5 w-5 text-blue-600"
            />
            <span class="ml-2 text-gray-500 text-xs">Save credentials</span>
          </label>
          <div className="flex items-center justify-between">
            <button
              onClick={handleSubmit}
              className="bg-blue-700 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full flex justify-center items-center"
            >
              {loading_Login_Handler ? <ThreeDot /> : "Log In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginHandlerAction: (email, password) =>
      dispatch(loginHandler(email, password)),
  };
};

const mapStateToProps = (state) => {
  return {
    loading_Login_Handler: state.loginReducer.login.loading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
