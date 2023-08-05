import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Loading } from "../components";
import { useAuth } from "../contexts/useAuth";
import NavStr from "./NavStr";

export function Protect(Component) {
  return function ProtectedComponent(props) {
    const [screenLoading, setScreenLoading] = useState(true);
    const { userData, loading, token } = useAuth();
    const navigation = useNavigation();
    const router = useRoute();

    useEffect(() => {
      if (!loading) {
        if (userData?.data?.status === "inactive" || !token) {
          navigation.replace(NavStr.LOGIN, { from: router.name });
        } else {
          setScreenLoading(false);
        }
      }
    }, [loading, userData?.data?.role, navigation, router, screenLoading]);

    if (screenLoading) {
      return <Loading />;
    } else {
      return <Component {...props} />;
    }
  };
}
