import { useState, useEffect } from "react";
import {axiosInstance} from "./axios.js";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/auth/check");
        if (res.data.user) {
          setUser(res.data.user);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  return { user, loading };
};

export default useAuth;
