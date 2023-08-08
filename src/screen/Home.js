import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import SearchHeader from "../Nav/components/searchHeader";
import { Container } from "../components";
import HomeCard from "../components/homeCard";
import { useAuth } from "../contexts/useAuth";

const Home = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);

  const { refetch, userData } = useAuth();
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const limit = 10;
      const response = await axios.get(
        `https://musfiqeen-backend.vercel.app/api/v1/posts/get?id=${userData?.data?._id}&limit=${limit}&skip=${skip}`
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
  }, [skip, refetch, userData?.data?._id]);

  const handleLoadMore = () => {
    if (!loading) {
      setSkip((prevSkip) => prevSkip + 10);
    }
  };

  // if (loading && skip === 0) return <Loading />;

  const estimatedItemSize = parseInt(total) || 100;

  return (
    <Container style={{ marginBottom: 40 }}>
      <SearchHeader navigation={navigation} />
      <FlatList
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
    </Container>
  );
};

export default Home;
