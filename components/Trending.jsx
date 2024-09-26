import { View, Text, FlatList } from "react-native";
import React from "react";

const Trending = ({ posts }) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Text className="text-3xl text-black">{item.id}</Text>
      )}
      horizontal
    >
      <Text>Trending</Text>
    </FlatList>
  );
};

export default Trending;
