import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { fetchSearchProducts } from "../api/products";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

export default function Search() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (term) => {
    setSearchTerm(term);
    if (term) {
      setIsLoading(true);
      const results = await fetchSearchProducts(term);
      setFilteredData(results);
      setIsLoading(false);
    } else {
      setFilteredData([]);
    }
  };

  const resetSearch = () => {
    setSearchTerm("");
    setFilteredData([]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/product-details/[id]",
          params: { id: item.id },
        })
      }
      key={item.id}
      style={styles.item}
    >
      <Image
        source={{
          uri: `http://localhost/camera-app/public/images/products/${item.image}`,
        }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemPrice}> {item.price} VND</Text>
      </View>
    </TouchableOpacity>
  );

  useFocusEffect(
    React.useCallback(() => {
      resetSearch();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tìm kiếm!</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm sản phẩm..."
          placeholderTextColor="#888"
          value={searchTerm}
          onChangeText={handleSearch}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4CAF50",
    textAlign: "center",
    marginBottom: 20,
  },
  searchContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 25,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333",
    paddingLeft: 5,
  },
  list: {
    paddingBottom: 20,
  },
  item: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 15,
    backgroundColor: "#FFF",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  itemText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FF5733",
    marginTop: 5,
  },
});
