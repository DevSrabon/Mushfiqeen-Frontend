import { useFonts } from "expo-font";
import AuthProvider from "./src/contexts/useAuth";
import DrawerNavigation from "./src/Nav/DrawerNavigation";

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
      <AuthProvider>
        <DrawerNavigation />
      </AuthProvider>
    </>
  );
}
