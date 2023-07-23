import { FlashList } from "@shopify/flash-list";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Loading } from "../components";
import HomeCard from "../components/homeCard";
import { useAuth } from "../contexts/useAuth";
// ... (imports remain the same)

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const { refetch } = useAuth();

  const fetchPosts = async () => {
    try {
      const limit = 10;
      const response = await axios.get(
        `https://musfiqeen-backend.vercel.app/api/v1/posts/get?limit=${limit}&skip=${skip}`
      );
      if (skip === 0) {
        setPosts(response.data.data);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...response.data.data]);
      }
      setTotal(response.data.total);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (refetch) {
      setSkip(0);
      fetchPosts();
    } else {
      fetchPosts();
    }
  }, [skip, refetch]);

  const handleLoadMore = () => {
    if (!loading) {
      setSkip((prevSkip) => prevSkip + 10);
    }
  };

  if (loading && skip === 0) return <Loading />;

  // Use a fallback value for the estimatedItemSize (e.g., 100) if the total is not a valid numeric value.
  const estimatedItemSize = parseInt(total) || 100;

  return (
    <View style={{ flex: 1 }}>
      <FlashList
        data={posts}
        renderItem={({ item }) => <HomeCard post={item} />}
        keyExtractor={(item) => item?._id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        estimatedItemSize={estimatedItemSize}
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
