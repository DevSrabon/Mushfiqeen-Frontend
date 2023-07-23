import { FlashList } from "@shopify/flash-list";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { FlatList } from "react-native";
import Container from "../components/container";

import { Text, View } from "react-native";
import { Loading } from "../components";

import HomeCard from "../components/homeCard";
import { useAuth } from "../contexts/useAuth";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [total, setTotal] = useState(0);
  console.log("🚀 ~ file: Home.js:14 ~ Home ~ total:", total);
  const { refetch } = useAuth();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const limit = 5;
      const response = await axios.get(
        `https://musfiqeen-backend.vercel.app/api/v1/posts/get?limit=${limit}&skip=${skip}`
      );
      console.log(response.data.data);
      if (response.data.data.length === 0) {
        // No more posts available, so set hasMorePosts to false
        setHasMorePosts(false);
      } else {
        // Append the fetched posts to the current posts list
        setPosts((prevPosts) => [...prevPosts, ...response.data.data]);
        setTotal(response.data.total);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasMorePosts || refetch) {
      fetchPosts();
    }
  }, [skip, hasMorePosts, refetch]);

  const handleLoadMore = () => {
    if (!loading && hasMorePosts) {
      setSkip((prevSkip) => prevSkip + 5);
    }
  };
  if (loading && skip === 0) return <Loading />;

  return (
    <View style={{ flex: 1 }}>
      <FlashList
        data={posts}
        renderItem={({ item }) => <HomeCard post={item} />}
        keyExtractor={(item) => item?._id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        estimatedItemSize={parseInt(total)}
        ListFooterComponent={
          loading && (
            <Text style={{ alignItems: "center" }}>Loading more...</Text>
          )
        }
      />
    </View>
  );
};

export default Home;
