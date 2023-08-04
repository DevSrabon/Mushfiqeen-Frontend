import React from "react";
import { View, ScrollView } from "react-native";
import SkeletonPage from "./SkeletonPage";

const SkeletonMain = () => {

  return (
    <ScrollView >
      <View style={{marginTop:25}}>
        <SkeletonPage />
        <SkeletonPage />
        <SkeletonPage />
      </View>
    </ScrollView>
  );
};

export default SkeletonMain;


