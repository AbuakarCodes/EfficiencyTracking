import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { Credentials } from "../utils/axios_Credentials";
import { isLoggedIN_URL } from "../../API_EndPoints";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState({ state: false, message: "" });

  // Check login status once app loads
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get(isLoggedIN_URL, Credentials);
        if (
          res.headers["content-type"]?.includes("application/json") &&
          res.data?.data?.isLoggedin === true
        ) {
          setIsLoggedIn(true);
          setUserId(res.data?.data?.users_id);
          setError({ state: false, message: "" });
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        setIsLoggedIn(false);
        setError({
          state: true,
          message: err.response?.data?.message || "Not logged in",
        });
      } finally {
        setIsChecking(false);
      }
    };

    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        IsLoggedIn,
        setIsLoggedIn,
        isChecking,
        error,
        userId,
        setUserId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for consuming the auth context
export function useAuthContext() {
  return useContext(AuthContext);
}
