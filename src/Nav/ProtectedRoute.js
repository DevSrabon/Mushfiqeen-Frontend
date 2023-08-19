import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Loading } from "../components";
import { useAuth } from "../contexts/useAuth";
import NavStr from "./NavStr";

export function Protect(Component) {
  return function ProtectedComponent(props) {
    const [screenLoading, setScreenLoading] = useState(true);
    const { loading, token } = useAuth();
    const navigation = useNavigation();
    const router = useRoute();

    useEffect(() => {
      if (!loading) {
        if (!token) {
          navigation.navigate(NavStr.LOGIN, { from: router.name });
        } else {
          setScreenLoading(false);
        }
      }
    }, [loading, navigation, router, screenLoading]);

    if (screenLoading) {
      return <Loading />;
    } else {
      return <Component {...props} />;
    }
  };
}
