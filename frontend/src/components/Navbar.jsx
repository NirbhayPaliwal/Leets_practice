import profile from "../assets/profile.jpg";
import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import useAuth from "../lib/useAuth.js";

const Navbar = () => {
  const [isOpen, setisOpen] = useState(null);
  const { loading, user } = useAuth();
  const logout = async () => {
    const res = await axiosInstance.get("/auth/logout");
    if (!res.body.ok) alert(res.body.message);
  };
  return (
    <section>
      <nav>
        <div className="flex h-[75px] justify-between w-full bg-darkest px-[60px]">
          <a
            className="flex items-center justify-center text-white text-2xl px-4"
            href="/">
            {" "}
            Leet's
          </a>
          {!loading && user && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="rounded"
                onClick={() => setisOpen(!isOpen)}>
                <img
                  src={profile}
                  alt="Profile"
                  width={50}
                  className="rounded-full my-3"
                />
              </div>
              {isOpen && (
                <ul
                  tabIndex={0}
                  className="menu dropdown-content bg-darker border-[1px] outline-none rounded-md z-[1] w-[12rem] p-2 shadow">
                  <li>
                    <a
                      className="text-white btn border-none flex justify-center rounded-sm hover:bg-dark text-lg font-light"
                      href="/profile">
                      Profile
                    </a>
                  </li>
                  <li className="border-t border-gray-500" onClick={logout}>
                    <a
                      className="text-white btn border-none flex justify-center rounded-sm hover:bg-dark text-lg font-light"
                      href="/login">
                      Logout
                    </a>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
