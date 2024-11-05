import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import { fetchProducts } from "./../api/products";
import { useRouter } from "expo-router";

const { width: windowWidth } = Dimensions.get("window");

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();
        console.log(products);
        if (products) {
          setProducts(products);
        } else {
          console.error("Products data is not an array");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#FF4081" />;
  }

  return (
    <View style={styles.productsContainer}>
      {products.map((product) => (
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/product-details/[id]",
              params: { id: product.id },
            })
          }
          key={product.id}
          style={styles.productCard}
        >
          <Image
            source={{
              uri: `http://localhost/camera-app/public/images/products/${product.image}`,
            }}
            style={styles.IMGslider}
            resizeMode="cover"
          />
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>{product.price}</Text>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>Mua ngay</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 8,
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
  IMGslider: {
    height: 150,
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
  productPrice: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FF5733",
    marginBottom: 8,
  },
  addButton: {
    marginTop: 8,
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: "center",
  },
  addButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default Product;
