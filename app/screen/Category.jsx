import React, { useEffect, useState } from 'react'
import {fetchCategories} from "../api/categories"
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

const Category = () => {
  const [categories, setCategories] = useState([]); // Khởi tạo products là mảng rỗng
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchCategories();
        console.log(products); // Kiểm tra phản hồi API
        if (products) {
          setCategories(products); // Kiểm tra xem data.products có phải là mảng không
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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryCard}
            onPress={() => handleCategoryPress(category.name)}
          >
            <Text type="title" style={styles.categoryText}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  )
}

export default Category

const styles = StyleSheet.create({
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

  })

