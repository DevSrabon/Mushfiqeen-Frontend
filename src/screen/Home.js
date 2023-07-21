import { StyleSheet } from "react-native";
import React from "react";
import Container from "../components/container";
import HomeCard from "../components/homeCard";
import PostDetails from "./PostDetails";
import DrawerNav from "../navigation/Drawer";

const Home = () => {
  return (
    <Container>
      {/* <DrawerNav /> */}
      <HomeCard />
    </Container>
  );
};

const styles = StyleSheet.create({});

export default Home;
