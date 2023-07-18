import { useFonts } from "expo-font";
import Home from "./src/screen/Home";
import Drawer from "./src/components/drawer-navigation/Drawer";
import DrawerNav from "./src/components/drawer-navigation/Drawer";

export default function App() {
  const [loaded] = useFonts({
    Regular: require("./assets/fonts/Sora-Regular.ttf"),
    Medium: require("./assets/fonts/Sora-Medium.ttf"),
    SemiBold: require("./assets/fonts/Sora-SemiBold.ttf"),
    Bold: require("./assets/fonts/Sora-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <>
      <DrawerNav />
      {/* <Home /> */}
    </>
  );
}
