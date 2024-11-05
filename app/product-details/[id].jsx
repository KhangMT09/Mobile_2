import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { fetchProductById } from "../api/products";
import { useRoute } from "@react-navigation/native";

export default function ProductDetails() {
  const route = useRoute();
  const { id } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProductDetails = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data.product);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProductDetails();
  }, [id]);

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `http://localhost/camera-app/public/images/products/${product.image}` }}
        style={styles.mainImage}
        resizeMode="cover"
      />
      <View style={styles.header}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}> {product.price} VND</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.productDescription}>{product.description}</Text>
        
        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Số lượng:</Text>
          <View style={styles.quantityControls}>
            <TouchableOpacity onPress={decrementQuantity} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={incrementQuantity} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cartButton}>
          <Text style={styles.buttonText}>Thêm vào giỏ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.buttonText}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  mainImage: {
    width: "100%",
    height: 250,
    borderRadius: 10,
  },
  header: {
    marginTop: 10,
    marginLeft: 10,
    alignItems: "left",
  },
  productName: { fontSize: 24, fontWeight: "bold", color: "#333", marginTop: 10 },
  productPrice: { fontSize: 20, color: "#FF5733", marginTop: 5, fontWeight: "600" },
  productDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  scrollContainer: { paddingBottom: 80 },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: "#4CAF50",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  additionalDetails: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
  detailsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  detailsText: { fontSize: 14, color: "#666" },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#FFF",
  },
  cartButton: {
    flex: 1,
    backgroundColor: "#FF5733",
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
