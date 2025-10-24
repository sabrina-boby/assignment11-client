import React, { use, useEffect, useRef, useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext/AuthContext";

const Login = () => {
  const { signIn, googleSignIn, newPasswordSet } = use(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();

  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log({ email, password });

    signIn(email, password)
      .then((result) => {
        // Signed in
        const user = result.user;
        // console.log(user);
        toast.success(`successfully logged in with Email`, {
          position: "top-right",
          autoClose: 3000,
        });
        navigate(`${location.state ? location.state : "/"}`);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        console.log(error);
        // setError(errorCode);
      });
  };
  //google signIn
  const handleGoogleSignIn = () => {
    googleSignIn();
    toast.success(`successfully logged in with Gmail`, {
      position: "top-right",
      autoClose: 3000,
    });
  };
  //Forget Password
  const handleForgetPass = () => {
    const email = emailRef.current.value;
    newPasswordSet(email);
  };

  
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h2 className="text-center font-bold pt-5 text-2xl">
          Login your account
        </h2>
        <form onSubmit={handleLogin} className="card-body">
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="Email"
              ref={emailRef}
            />
            <label className="label">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="input"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-[30px] top-3"
              >
                {showPassword ? <LuEye /> : <LuEyeClosed />}
              </button>
            </div>

            <div onClick={handleForgetPass}>
              <a className="link link-hover">Forgot password?</a>
            </div>
            {/* {error && <p className="text-red-500 text-xs">{error}</p>} */}
            <button type="submit" className="btn btn-neutral mt-4">
              Login
            </button>
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-outline btn-secondary"
            >
              <FcGoogle size={24} />
              Login with Google
            </button>
            <p className="font-semibold text-center">
              Don't Have An Account ?
              <Link className="text-red-600" to="/register">
                Register
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;
