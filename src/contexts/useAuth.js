import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [refetch, setRefetch] = useState(false);
  const [userData, setUserData] = useState(null);
  console.log("🚀 ~ file: useAuth.js:9 ~ AuthProvider ~ userData:", userData);
  const [token, setToken] = useState(null);

  const fetchUserData = async () => {
    try {
      if (!token) {
        return;
      }

      const response = await fetch(
        "https://musfiqeen-backend.vercel.app//api/v1/users/jwt",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await response.json();
      setUserData(userData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Error retrieving token from AsyncStorage:", error);
      }
    };

    retrieveToken();
  }, []);

  useEffect(() => {
    const storeToken = async () => {
      try {
        if (token !== null) {
          await AsyncStorage.setItem("token", token);
        } else {
          await AsyncStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Error storing token in AsyncStorage:", error);
      }
    };

    storeToken();
  }, [token]);

  useEffect(() => {
    fetchUserData();
  }, [token]);

  const authInfo = { refetch, setRefetch, userData, setToken };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
