import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function IntroScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/logomayanh.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Chào Mừng!</Text>
      <Text style={styles.description}>
        Chúng tôi giúp bạn tìm kiếm những sản phẩm phù hợp với nhu cầu của bạn.
      </Text>
      <TouchableOpacity style={styles.button}>
        <Link href="/(tabs)/signin">
          <Text style={styles.buttonText}>Bắt Đầu</Text>
        </Link>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 30,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 15,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#555555",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 50,
    lineHeight: 24,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    paddingHorizontal: 80,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    fontSize: 18,
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});
