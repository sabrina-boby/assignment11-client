import React, { use } from "react";
import userImg from "../../../assets/images.png";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../../context/AuthContext/AuthContext";
import { toast } from "react-toastify";
import NotificationBell from "../NotificationBell/NotificationBell";

const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  // console.log(user);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success(`Sign-out successful.`, {
          position: "top-right",
          autoClose: 3000,
        });
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error);
        // An error happened.
      });
  };
  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "border-b-3 border-black ml-4 mr-4 font-bold" : "ml-4 mr-4"
        }
      >
        Home
      </NavLink>
       <NavLink
        to="/find-tutors"
        className={({ isActive }) =>
          isActive ? "border-b-3 border-black ml-4 mr-4 font-bold" : "ml-4 mr-4"
        }
      >
        Find tutors
      </NavLink>
      
       <NavLink
        to="/add-tutorials"
        className={({ isActive }) =>
          isActive ? "border-b-3 border-black ml-4 mr-4 font-bold" : "ml-4 mr-4"
        }
      >
        Add Tutorials
      </NavLink>
      
       <NavLink
        to="/my-tutorials"
        className={({ isActive }) =>
          isActive ? "border-b-3 border-black ml-4 mr-4 font-bold" : "ml-4 mr-4"
        }
      >
        My Tutorials
      </NavLink>
       <NavLink
        to="/my-booked-tutors"
        className={({ isActive }) =>
          isActive ? "border-b-3 border-black ml-4 mr-4 font-bold" : "ml-4 mr-4"
        }
      >
        My booked tutors
      </NavLink>
    </>
  );
  return (
     <div className="">
      <div className=" navbar bg-base-100 max-w-[1200px] mx-auto">
        <div className=" navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {/* ============== */}
              {links}
              {/* ============== */}
            </ul>
          </div>

          <div className="logo flex font-extrabold text-2xl items-center">
            {/* <img className="w-14" src={logo} alt="" /> */}
            <h1>Language Academy</h1>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {/* ============== */}
            {links}
            {/* ============== */}
          </ul>
        </div>

        <div className="navbar-end gap-4">
          {/* dark-light toggle */}
          <input
            type="checkbox"
            value="dark"
            className="toggle theme-controller"
          />

          {/* Notification Bell */}
          {user && <NotificationBell />}

          {/* <div>{user && user.email}</div> */}
          <div className="relative group">
            {/* =======hover name */}
            <div
              className="tooltip tooltip-bottom"
              data-tip={(user && user.displayName) || "User"}
            >
              {user && (
                <img
                  className="w-12 h-12 rounded-full cursor-pointer tooltip"
                  data-tip="hello"
                  alt={user?.displayName || "User"}
                  src={user?.photoURL || userImg}
                />
              )}
            </div>
            {user?.displayName && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max whitespace-nowrap bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {user.displayName}
              </div>
            )}
          </div>

          {/* ======= */}
          {user ? (
            <button onClick={handleLogOut} className="btn">
              LogOut
            </button>
          ) : (
            <Link className="btn" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
