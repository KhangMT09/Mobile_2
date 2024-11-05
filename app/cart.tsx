import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Button } from 'react-native';

const CartScreen = () => {
  const [quantities, setQuantities] = useState([1, 1, 1]);

  const products = [
    { id: 1, title: "Canon EOS RP", price: 10000000, imageUrl: 'https://kyma.vn/StoreData/images/Product/may-anh-canon-eos-rp-kit-rf24-105mm-f471-is-stm-nhap-khau.jpg' },
    { id: 2, title: "Sony Alpha A6400", price: 15000000, imageUrl: 'https://kyma.vn/StoreData/images/Product/may-anh-sony-alpha-ilce-6700l-a6700-kit-16-50mm-f35-56-oss.jpg' },
    { id: 3, title: "Fujifilm XT200", price: 12000000, imageUrl: 'https://kyma.vn/StoreData/images/Product/may-anh-fujifilm-x-t30-mark-ii-kit-xc15-45mm-f3-5-5-6-ois-pz.jpg' },
  ];

  const updateQuantity = (index, delta) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] + delta > 0) {
      newQuantities[index] += delta;
      setQuantities(newQuantities);
    }
  };

  const removeProduct = (index) => {
    const newQuantities = quantities.filter((_, i) => i !== index);
    setQuantities(newQuantities);
  };

  const totalAmount = products.reduce((total, product, index) => total + product.price * quantities[index], 0);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {products.map((product, index) => (
          <View key={product.id} style={styles.productContainer}>
            <Image source={product.imageUrl} style={styles.imageUrl} />
            <View style={styles.detailsContainer}>
              <Text style={styles.productTitle}>{product.title}</Text>
              <Text style={styles.price}>{(product.price).toLocaleString()} VNĐ</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => updateQuantity(index, -1)} style={styles.button}>
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantities[index]}</Text>
                <TouchableOpacity onPress={() => updateQuantity(index, 1)} style={styles.button}>
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={() => removeProduct(index)} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <View style={styles.checkoutContainer}>
        <Text style={styles.totalAmount}>Tổng tiền: {totalAmount.toLocaleString()} VNĐ</Text>
        <Button title="Thanh toán" onPress={() => alert('Chuyển đến thanh toán')} color="#4CAF50" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollView: {
    padding: 15,
  },
  productContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 2,
  },
  imageUrl: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#e74c3c',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#ccc',
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  deleteButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: '#ff3d3d',
    borderRadius: 15,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff123',
    fontWeight: 'bold',
  },
  checkoutContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 2,
    marginTop: 'auto',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default CartScreen;
