import React from "react";
import { ScrollView } from "react-native";
import SkeletonPage from "./SkeletonPage";

const SkeletonMain = () => {
  return (
    <ScrollView>
      <SkeletonPage />
      <SkeletonPage />
      <SkeletonPage />
    </ScrollView>
  );
};

export default SkeletonMain;
