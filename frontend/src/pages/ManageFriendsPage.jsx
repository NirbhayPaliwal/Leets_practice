import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../components/Navbar.jsx";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash } from "react-icons/fa"; // Import trash icon
import { useEffect } from "react";
import Loading from "../components/Loading.jsx";
import { axiosInstance } from "../lib/axios";
import useAuth from "../lib/useAuth.js";

const ManageFriendsPage = () => {
  const navigate = useNavigate();
  
  const [friends, setFriends] = useState([]);
  const { user, loading } = useAuth();
  const [friendsLoading, setFriendsLoading] = useState(true);
  const [removingIndices, setRemovingIndices] = useState([]);

  // Handle removing a friend
  const handleRemove = async (index) => {
    setRemovingIndices((prev) => [...prev, index]);
    try {
      const res = await axiosInstance.get(`/friend/remove/${friends[index]}`);
      if(res.data.ok) {
        setFriends(friends.filter((_, i) => i !== index));
        toast.success("Friend removed successfully!", {
          position: "top-center",
          autoClose: 2000,
        });
      }
      else {
        toast.error("Failed to remove friend.", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (err) {
      toast.error("Failed to remove friend.", {
        position: "top-center",
        autoClose: 2000,
      });
    } finally {
      setRemovingIndices((prev) => prev.filter((i) => i !== index));
    }
  }
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        setFriendsLoading(true); 
        const res = await axiosInstance.get(`/friend/get`);
        setFriends(res.data.list);
      } catch (err) {
        console.error("Failed to fetch friends:", err);
        toast.error("Could not load friends.", { position: "top-center" });
      } finally {
        setFriendsLoading(false);
      }
    };

    if (!loading && user) {
      fetchFriends();
    }
  }, [loading, user]);
  
  // Assign colors to usernames
  const colors = [
    "text-red-500",
    "text-green-500",
    "text-blue-500",
    "text-yellow-500",
  ];
  
  if(loading || friendsLoading) return <Loading />;
  return (
    <div className="bg-darker min-h-screen">
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-dark text-white p-6">
        <ToastContainer /> {/* Toast Notifications */}
        <div className="bg-darkest p-6 rounded-lg shadow-lg w-full max-w-3xl">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Manage Friends
          </h2>

          {/* Friends List Table */}
          <table className="w-full border-collapse border border-gray-700">
            <thead>
              <tr className="bg-darker">
                <th className="border border-gray-600 p-2">#</th>
                <th className="border border-gray-600 p-2">Who</th>
                <th className="border border-gray-600 p-2">Remove</th>
              </tr>
            </thead>
            <tbody>
              {friends.length > 0 ? (
                friends.map((friend, index) => (
                  <tr
                    key={index}
                    className={`text-center text-white ${
                      index % 2 === 0 ? "bg-dark" : "bg darker"
                    }`}>
                    <td className="border border-gray-600 p-2">{index + 1}</td>
                    <td className="border border-gray-600 p-2 font-semibold">
                      {friend}
                      {/* <td className={`border border-gray-600 p-2 font-semibold ${colors[index % colors.length]}`}>
                    {friend} */}
                    </td>
                    <td className="border border-gray-600 p-2">
                      <button
                        onClick={() => handleRemove(index)}
                        className="text-red-500 hover:text-red-400"
                        disabled={removingIndices.includes(index)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-4 text-gray-400 text-center">
                    No friends found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Back Button */}
          <button
            onClick={() => navigate("/profile")}
            className="w-full mt-4 bg-dark hover:bg-darker transition-transform transform hover:scale-105 text-white px-4 py-2 rounded-full">
            Back to Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageFriendsPage;
