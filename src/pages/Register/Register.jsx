import React, { use, useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { Link, Navigate, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";

const Register = () => {
  const { createUser, setUser, googleSignIn, updateUser } = use(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    // Validation checks
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;

    if (!hasUppercase || !hasLowercase || !isLongEnough) {
      let message = "Password must:";
      if (!hasUppercase) message += " include at least one uppercase letter,";
      if (!hasLowercase) message += " include at least one lowercase letter,";
      if (!isLongEnough) message += " be at least 6 characters long.";
      setPasswordError(message);
      return;
    }
    setPasswordError("");
    //signup
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        // console.log(user);
        setUser(user);
        toast.success(`successfully register with Email`, {
          position: "top-right",
          autoClose: 3000,
        });

        //update user
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            navigate("/");
            // console.log(user);
          })
          .catch((error) => {
            // An error occurred
            console.log(error);
            setUser(user);
          });
        // =========================
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
        // =========================
      });
  };
  //google signIn
  const handleGoogleSignIn = () => {
    googleSignIn();
    toast.success(`successfully register with Gmail`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h2 className="text-center font-bold pt-5 text-2xl">
          Register your account
        </h2>
        <div className="card-body">
          <form onSubmit={handleRegister} className="fieldset">
            {/* Name */}
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              className="input input-bordered"
              placeholder="Name"
            />
            {/* {nameError && <p className="text-red-500 text-xs">{nameError}</p>} */}
            {/* Photo URL */}
            <label className="label">Photo URL</label>
            <input
              type="text"
              name="photo"
              className="input input-bordered"
              placeholder="Photo URL"
            />

            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input input-bordered"
              placeholder="Email"
            />

            {/* Password */}
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
            <div className="text-red-600">{passwordError}</div>

            <button type="submit" className="btn btn-neutral mt-4">
              Register
            </button>
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-outline btn-secondary"
            >
              <FcGoogle size={24} />
              Login with Google
            </button>
            <p className="font-semibold text-center">
              Already Have An Account ?
              <Link className="text-red-600" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
