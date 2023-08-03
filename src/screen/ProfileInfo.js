import React from "react";
import {
  ScrollView
} from "react-native";

import ProfilePage from "./ProfilePage";
// import { ScrollView } from "react-native-gesture-handler";

const ProfileInfo = () => {
  return (
    <ScrollView style={{ flexGrow: 1 }}>
      <ProfilePage />
    </ScrollView>
  );
};

export default ProfileInfo;