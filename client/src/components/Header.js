/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Redirect } from "react-router-dom";
import { logout } from "../actions/userAction";
import Loader from "../loader/Loader";

const Header = () => {
    const dispatch = useDispatch();
    const { error, loading, isAuthenticated, user } = useSelector(
        (state) => state.user
    );



    const [nav, setNav] = useState(false);

    const handlenav = () => {
        setNav(!nav);
    };
    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className=" md:grid bg-slate-200 flex justify-between  md:grid-cols-3
                h-20 items-center ">
                    {/* <div className=" flex justify-between items-center md:grid md:grid-cols-3"> */}

                    {/* part 1 */}

                    <div >
                        <Link to={"/"}>
                            <h1 className="width-full px-5 text-3xl font-bold text-[#ffb30d]">
                                E-Shop
                            </h1>
                        </Link></div>

                    {/* part 2 */}

                    <div>
                        <ul className="hidden md:flex justify-center items-center">
                            <Link to={"/"}>
                                <li className="p-4 hover:text-[#ffb30d]">Home</li>
                            </Link>
                            {
                                user &&
                                <div className="flex">
                                    <Link to={"/addservice"}>
                                        <li className="p-4 hover:text-[#ffb30d]">Add Service</li>
                                    </Link>
                                    <Link to={"/myreviews"}>
                                        <li className="p-4 hover:text-[#ffb30d]">My Reviews</li>
                                    </Link>
                                </div>
                            }
                            <Link to={"/blogs"}>
                                <li className="p-4 hover:text-[#ffb30d]">Blogs</li>
                            </Link>
                        </ul>
                    </div>

                    {/* part 3 */}

                    <div>
                        <ul className="hidden md:flex justify-center items-center">

                            {/* Conditional rendering based on user */}
                            {user ? (
                                <div className="flex items-center gap-3">

                                    <h1>{user.name}</h1>
                                    <Link to={"/account"}>
                                        <img
                                            className="rounded-full"
                                            src={user.userImage}
                                            alt={user.name}
                                            width={50}
                                        />
                                    </Link>
                                    <button className="bg-[#ffb30d] text-black px-3 py-2" onClick={handleLogout}>Logout</button>
                                </div>
                            ) : (
                                <div className="flex">

                                    <Link to={"/signup"}>
                                        <li className="p-4 hover:text-[#ffb30d]">Signup</li>
                                    </Link>
                                    <Link to={"/login"}>
                                        <li className="p-4 hover:text-[#ffb30d]">Login</li>
                                    </Link>
                                </div>
                            )}

                        </ul>
                        {/* </div> */}

                    </div>




                    {/* Reaponsive */}

                    <div onClick={handlenav} className="block md:hidden z-100">
                        {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
                    </div>
                    <div
                        className={
                            nav
                                ? "fixed left-0 top-0 w-[80%]  h-full bg-[#49d4a8] ease-out duration-500"
                                : "fixed left-[-100%]"
                        }
                    >
                        <ul className="pt-24 uppercase">

                            {user ? (
                                <div className="flex flex-col items-center ">
                                    <h1>{user.name}</h1>
                                    <Link to={"/account"}>
                                        <img
                                            className="rounded-full"
                                            src={user.userImage}
                                            alt={user.name}
                                            width={50}
                                        />
                                    </Link>
                                    <Link to={"/addservice"}>
                                        <li className="p-4 text-center border-b border-b-[#ffffff]">
                                            Add Service
                                        </li>
                                    </Link>
                                    <Link to={"/myreviews"}>
                                        <li className="p-4 text-center border-b border-b-[#ffffff]">
                                            My Reviews
                                        </li>
                                    </Link>
                                    <Link to={"/"}>
                                        <li className="p-4 text-center border-b border-b-[#ffffff]">
                                            Home
                                        </li>
                                    </Link>

                                    <Link to={"/blogs"}>
                                        <li className="p-4 text-center border-b border-b-[#ffffff]">
                                            Blogs
                                        </li>
                                    </Link>
                                    <button
                                        className="bg-[#ffb30d] text-black px-3 py-2"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <Link to={"/"}>
                                        <li className="p-4 text-center border-b border-b-[#ffffff]">
                                            Home
                                        </li>
                                    </Link>

                                    <Link to={"/blogs"}>
                                        <li className="p-4 text-center border-b border-b-[#ffffff]">
                                            Blogs
                                        </li>
                                    </Link>
                                    <Link to={"/signup"}>
                                        <li className="p-4 text-center border-b border-b-[#ffffff]">
                                            Signup
                                        </li>
                                    </Link>
                                    <Link to={"/login"}>
                                        <li className="p-4 text-center border-b border-b-[#ffffff]">
                                            Login
                                        </li>
                                    </Link>
                                </div>
                            )}

                            {/* <Link to={'/contact'}>
                            <li className="p-4 text-center border-b border-b-[#ffffff]">Contact</li>
                        </Link>
                        <Link to={'/signup'}>
                            <li className="p-4 text-center border-b border-b-[#ffffff]">Signup</li>
                        </Link >
                        <Link to={'/login'}>
                            <li className="p-4 text-center border-b border-b-[#ffffff]">Login</li>
                        </Link> */}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
