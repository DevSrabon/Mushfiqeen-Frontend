import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";
export const AuthContext = createContext(null);

const AuthProvider = ({ children, navigation }) => {
  const [refetch, setRefetch] = useState(false);
  const [bayanRefetch, setBayanRefetch] = useState(false);
  const [updateRefetch, setUpdateRefetch] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [postId, setPostId] = useState(null);
  const [bayan, setBayan] = useState({});
  const [profile, setProfile] = useState({});

  const fetchUserData = async () => {
    try {
      setLoading(true);
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
      setUserData({ ...userData, accessToken: token });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        setLoading(true);
        const storedToken = await SecureStore.getItemAsync("token");
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Error retrieving token from AsyncStorage:", error);
      } finally {
        setLoading(false);
      }
    };

    retrieveToken();
  }, []);

  useEffect(() => {
    const storeToken = async () => {
      try {
        setLoading(true);
        if (token !== null) {
          await SecureStore.setItemAsync("token", token);
          // await SecureStore.deleteItemAsync("token");
        } else {
          await SecureStore.deleteItemAsync("token");
        }
      } catch (error) {
        console.error("Error storing token in AsyncStorage:", error);
      } finally {
        setLoading(false);
      }
    };

    storeToken();
  }, [token]);

  useEffect(() => {
    fetchUserData();
  }, [token]);

  const authInfo = {
    refetch,
    bayan,
    setBayan,
    setRefetch,
    userData,
    setUserData,
    setToken,
    token,
    loading,
    setLoading,
    postId,
    setPostId,
    bayanRefetch,

    setBayanRefetch,
    fetchUserData,
    updateRefetch,
    setUpdateRefetch,
    profile,
    setProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
