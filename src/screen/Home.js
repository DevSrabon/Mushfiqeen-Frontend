import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import SearchHeader from "../Nav/components/searchHeader";
import SkeletonMain from "../components/Skeleton/SkeletonMain";
import HomeCard from "../components/homeCard";
import SubContainer from "../components/subContainer";
import { useAuth } from "../contexts/useAuth";

const Home = ({ navigation }) => {
  const [allPosts, setAllPosts] = useState([]); // Store all posts
  const [displayedPosts, setDisplayedPosts] = useState([]); // Posts to display
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  console.log("🚀 ~ file: Home.js:16 ~ Home ~ searchQuery:", searchQuery);

  const { refetch, userData } = useAuth();

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const limit = 10;
      let url = `https://musfiqeen-backend.vercel.app/api/v1/posts/get?id=${userData?.data?._id}&limit=${limit}&skip=${skip}`;
      const response = await axios.get(url);

      if (skip === 0) {
        setAllPosts(response.data.data);
      } else {
        setAllPosts((prevPosts) => [...prevPosts, ...response.data.data]);
      }

      setTotal(response.data.total);
      filterDisplayedPosts(); // Filter and set displayed posts
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filterDisplayedPosts = () => {
    if (searchQuery) {
      const filteredPosts = allPosts.filter(
        (post) =>
          post?.user &&
          post?.user?.fullName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      console.log(
        "🚀 ~ file: Home.js:50 ~ filterDisplayedPosts ~ filteredPosts:",
        filteredPosts
      );
      setDisplayedPosts(filteredPosts);
    } else {
      setDisplayedPosts(allPosts);
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

  useEffect(() => {
    filterDisplayedPosts(); // Update displayed posts when searchQuery changes
  }, [searchQuery, allPosts]);

  const handleLoadMore = () => {
    if (!loading) {
      setSkip((prevSkip) => prevSkip + 10);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  // if (loading && skip === 0) return <Loading />;

  const estimatedItemSize = parseInt(total) || 100;

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
