import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const AddImages = ({ imageUrls, takePhoto, error = false }) => {
  return (
    <View style={{ height: 120, width: "100%" }}>
      <View style={styles.imageHeader}>
        <View>
          <Text style={styles.imageHeaderText}>Image</Text>
          {error && <Text style={{ color: "red" }}>{error}</Text>}
        </View>
        <TouchableOpacity onPress={takePhoto} style={styles.addButton}>
          <Text style={styles.addButtonLabel}>Add Image +</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        {imageUrls.length > 0 &&
          imageUrls.map((img, index) => (
            <Image key={index} style={styles.image} source={{ uri: img }} />
          ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  imageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 20,
  },
  imageHeaderText: {
    fontFamily: "SemiBold",
    fontSize: 16,
  },
  addButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    textAlign: "right",
  },
  addButtonLabel: {
    color: "#B4AAF2",
    fontSize: 16,
    fontWeight: "500",
  },
  imageContainer: {
    height: 80,
    flexDirection: "row",
    gap: 5,
    marginLeft: 20,
    justifyContent: "flex-start",
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: "stretch",
    backgroundColor: "black",
    borderRadius: 8,
  },
});
export default AddImages;
