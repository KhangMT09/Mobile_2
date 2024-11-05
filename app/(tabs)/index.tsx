import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import Swiper from "react-native-swiper";
import { ThemedText } from "@/components/ThemedText";
import Slider from "../screen/Silder";
import { Link } from "expo-router";
import Product from "../screen/Product";
import Category from "../screen/Category";

const { width: windowWidth } = Dimensions.get("window");

const categories = [
  { id: 1, name: "Canon" },
  { id: 2, name: "Sony" },
  { id: 3, name: "Fujiflim" },
  { id: 4, name: "Nikon" },
];

const HomeScreen: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleCategoryPress = (categoryName: string) => {
    console.log(`Selected category: ${categoryName}`);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Logo and Cart Icon Row */}
      <View style={styles.logoContainer}>
        <Image
          source={require("@/assets/images/logomayanh.png")}
          style={styles.logo}
        />
        <Text style={styles.storeName}>CameraStore</Text>
        <TouchableOpacity>
          <Link href="../cart">
            <Image
              source={{
                uri: "https://img.pikbest.com/png-images/qiantu/shopping-cart-collection-icon_2623172.png!w700wp",
              }}
              style={styles.cartIcon}
            />
          </Link>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm sản phẩm. . . "
        />
        <TouchableOpacity style={styles.searchButton}>
          <Link href="./search">
            <ThemedText type="default" style={styles.searchButtonText}>
              Search
            </ThemedText>
          </Link>
        </TouchableOpacity>
      </View>
      <View>
        <Slider />
      </View>

      <Category />
      <Product />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFF",
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  logo: {
    width: 50,
    height: 50,
  },
  storeName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  cartIcon: {
    width: 40,
    height: 40,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
  },
  searchButton: {
    marginLeft: 8,
    backgroundColor: "#4CAF50",
    paddingHorizontal: 16,
    borderRadius: 4,
    height: 40,
    justifyContent: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  sliderContainer: {
    height: 200,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 16,
  },
  sliderImage: {
    height: "100%",
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryCard: {
    width: 80,
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    padding: 3,
    alignItems: "center",
    marginRight: 10,
  },
  categoryText: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
  },
  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FF5733",
    marginBottom: 8,
  },
  productCard: {
    width: "48%",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    alignItems: "center",
    elevation: 2,
  },
  productImage: {
    height: 120,
    width: "100%",
    borderRadius: 8,
  },
  productDetails: {
    alignItems: "center",
    marginTop: 8,
  },
  productName: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  addButton: {
    marginTop: 8,
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 4,
    alignItems: "center",
  },
});

export default HomeScreen;
