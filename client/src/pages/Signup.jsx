import React, { useState, useEffect } from "react";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { MdOutlineVisibility } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, register } from "../actions/userAction";
import Loader from "../loader/Loader";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    userImage: "",
  });

  const { name, email, password, userImage } = user;

  const registerSubmit = (e) => {
    e.preventDefault();

    // Form validation should also be handled on the client-side.
    if (!name || !email || !password || !userImage) {
      alert("Please fill in all the required fields.");
      return;
    }

    // Dispatch the registration action
    dispatch(register(user));
  };

  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (error) {
      alert("input data corectly");
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate("/login");
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="h-screen">
          <div className="w-full max-w-md m-auto my-6 rounded-md shadow-lg sm:p-8 bg-slate-50">
            <div>
              <div>
                <h2 className="mb-3 text-3xl font-semibold text-center">
                  Create an account
                </h2>
              </div>
            </div>

            {/* Form here */}
            <form
              className="space-y-8"
              encType="multipart/form-data"
              onSubmit={registerSubmit}
            >
              <div className="space-y-2">
                <div className="space-y-2">
                  <label className="block text-sm"> Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                    className="w-full px-3 py-2 border rounded-md text-black"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm">Email </label>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                    className="w-full px-3 py-2 border rounded-md text-black"
                  />
                </div>
                <div className="space-y-2 ">
                  <div className="flex justify-between">
                    <label className="text-sm">Password</label>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      name="password"
                      placeholder="password"
                      className="w-full px-3 py-2 border"
                      value={password}
                      onChange={registerDataChange}
                    />
                    {showPassword ? (
                      <AiOutlineEyeInvisible
                        className="absolute top-2 right-2"
                        size={25}
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <MdOutlineVisibility
                        size={25}
                        className="absolute top-2 right-2"
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm"> Image Url</label>
                  <input
                    type="text"
                    name="userImage"
                    placeholder="Image Url"
                    value={userImage}
                    onChange={registerDataChange}
                    className="w-full px-3 py-2 border rounded-md text-black"
                  />
                </div>
                <button
                  type="submit"
                  value="Register"
                  className="w-full px-8 py-3 font-semibold rounded-md  bg-cyan-600 text-white"
                >
                  Sign up
                </button>
                <div className="flex justify-center">
                  <p className="text-sm text-center">
                    Already have an account?
                  </p>
                  <div className=" text-cyan-600 text-sm focus:underline hover:underline">
                    <Link to="/login">Login</Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
