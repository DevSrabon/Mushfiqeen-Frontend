import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Container from "../components/container";
import colors from "../theme/Colors";

const Home = () => {
  return (
    <Container>
      <View style={{ backgroundColor: colors.bg }}>
        <Text style={{ color: colors.primary }}>Home</Text>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default Home;
