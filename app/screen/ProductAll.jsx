import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { fetchProducts } from '../api/products';


const ProductAll = () => {
    const [products, setProducts] = useState([]); // Khởi tạo products là mảng rỗng
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();
        console.log(products); // Kiểm tra phản hồi API
        if (products) {
          setProducts(products); // Kiểm tra xem data.products có phải là mảng không
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
    <>
        <View style={styles.productsContainer}>
        {products.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <Image
              source={{
                uri: `http://localhost/camera-app/public/images/products/${product.image}`,
              }}
              style={styles.IMGslider}
            />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>
                <Link href="../productDetail">{product.name}</Link>
              </Text>
              <Text style={styles.productPrice}>
                {product.price}
              </Text>
              <TouchableOpacity style={styles.addButton}>
                <Link href="../productDetail">
                  <Text>Mua ngay</Text>
                </Link>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </>
  )
}

export default ProductAll

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
    IMGslider: {
      objectFit: "cover",
      height: 150,
      width: 150, 
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