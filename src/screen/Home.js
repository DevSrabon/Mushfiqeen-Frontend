import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Container from "../components/container";
import colors from "../theme/Colors";
import HomeCard from "../components/homeCard";

const Home = () => {
  return (
    <Container>
      <HomeCard />
    </Container>
  );
};

const styles = StyleSheet.create({});

export default Home;
