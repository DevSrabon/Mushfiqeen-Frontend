import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList } from "react-native";
import SearchHeader from "../Nav/components/searchHeader";
import SkeletonMain from "../components/Skeleton/SkeletonMain";
import HomeCard from "../components/homeCard";
import SubContainer from "../components/subContainer";
import { useAuth } from "../contexts/useAuth";

const Home = ({ navigation }) => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const { refetch, userData } = useAuth();

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const limit = 10;
      const url = `https://musfiqeen-backend.vercel.app/api/v1/posts/get?id=${userData?.data?._id}&limit=${limit}&skip=${skip}`;
      const response = await axios.get(url);

      if (skip === 0) {
        setAllPosts(response.data.data);
      } else {
        setAllPosts((prevPosts) => [...prevPosts, ...response.data.data]);
      }

      setTotal(response.data.total);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [skip, userData?.data?._id]);

  const handleLoadMore = useCallback(() => {
    if (!loading) {
      setSkip((prevSkip) => prevSkip + 10);
    }
  }, [loading]);

  const handleSearch = useCallback((query) => {
    setSkip(0);
    setSearchQuery(query);
  }, []);

  useEffect(() => {
    if (refetch) {
      setSkip(0);
      fetchPosts();
    } else {
      fetchPosts();
    }
  }, [skip, refetch, fetchPosts]);

  const estimatedItemSize = useMemo(() => parseInt(total) || 100, [total]);

  const displayedPosts = useMemo(() => {
    if (searchQuery) {
      return allPosts.filter(
        (post) =>
          post?.user &&
          post?.user?.fullName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return allPosts;
  }, [searchQuery, allPosts]);

  return (
    <SubContainer style={{ paddingBottom: 40 }}>
      <SearchHeader navigation={navigation} onSearch={handleSearch} />
      <FlatList
        data={displayedPosts}
        renderItem={({ item }) => <HomeCard post={item} key={item?._id} />}
        keyExtractor={(item) => item?._id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        estimatedItemSize={estimatedItemSize}
        ListFooterComponent={loading && <SkeletonMain />}
      />
    </SubContainer>
  );
};

export default Home;
