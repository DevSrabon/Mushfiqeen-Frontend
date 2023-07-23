import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import Container from "../components/container";
import HomeCard from "../components/homeCard";
import { useAuth } from "../contexts/useAuth";

const Home = () => {
  const [posts, setPosts] = useState();
  const { refetch } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://musfiqeen-backend.vercel.app/api/v1/posts/get"
        );
        setPosts(res.data.data);
      } catch (error) {
        console.log({ error });
      }
    };
    fetchData();
  }, [refetch]);

  return (
    <Container>
      <FlatList
        data={posts}
        renderItem={({ item }) => <HomeCard post={item} key={item?._id} />}
        keyExtractor={(item) => item?._id}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default Home;
