import React from "react";
import { ScrollView, StatusBar } from "react-native";

import ProfilePage from "./ProfilePage";
import SubContainer from "../components/subContainer";
// import { ScrollView } from "react-native-gesture-handler";

const ProfileInfo = () => {
  return (
    <SubContainer>
      <ScrollView style={{ flexGrow: 1 }}>
        <ProfilePage />
      </ScrollView>
    </SubContainer>
  );
};

export default ProfileInfo;
