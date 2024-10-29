import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { myColors } from './../Utils/MyColors';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const Details = ({ route }) => {
  const [cartItems, setCartItems] = useState([]); // Local cart state
  const productData = route.params.main;  // Product data from Fake Store API
  const { title, price, description, image, category, id } = productData;
  const nav = useNavigation();

  // Add product to Favorites
  const addToFavorites = async (product) => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
  
      // Check if the product is already in the favorites list
      const isFavorite = favorites.some(item => item.id === product.id);
      if (isFavorite) {
        Alert.alert('Thông báo', 'Sản phẩm đã có trong danh sách yêu thích!');
        return;
      }
  
      favorites.push(product); // Add the product to the favorites list
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites)); // Save to AsyncStorage
      Alert.alert('Thành công', 'Sản phẩm đã được thêm vào danh sách yêu thích!');
    } catch (error) {
      console.error('Error adding to favorites:', error);
      Alert.alert('Lỗi', 'Không thể thêm sản phẩm vào danh sách yêu thích.');
    }
  };

  // Add product to cart and update API
  const addToCart = async (product) => {
    const newCartItems = [...cartItems, product]; // Add the product to the cart
    setCartItems(newCartItems); // Update local cart state

    // Update the cart in Fake Store API
    try {
      const response = await fetch('https://fakestoreapi.com/carts/7', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 1, // Use the appropriate user ID
          products: newCartItems.map((item) => ({
            productId: item.id,
            quantity: 1, // Default quantity is 1
          })),
        }),
      });

      const data = await response.json();
      console.log('Cart updated:', data);
      Alert.alert('Thành công', 'Sản phẩm đã được thêm vào giỏ hàng!');
      nav.navigate('Cart', { cartItems: newCartItems }); // Navigate to the cart screen
    } catch (error) {
      console.error('Error adding to cart:', error);
      Alert.alert('Lỗi', 'Không thể thêm sản phẩm vào giỏ hàng.');
    }
  };

  // Check if the product is already in the cart
  const isProductInCart = cartItems.some((item) => item.id === id);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" />
      
      {/* Product image */}
      <View>
        <Image
          resizeMode="contain"
          style={styles.productImage}
          source={{
            uri: image,
          }}
        />
        <View style={styles.topIconsContainer}>
          <Ionicons
            onPress={() => nav.goBack()}
            name="chevron-back"
            size={28}
            color="black"
          />
          <Feather name="share" size={28} color="black" />
        </View>
      </View>

      {/* Product information */}
      <View style={styles.infoContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.productTitle}>
            {title.charAt(0).toUpperCase() + title.slice(1)}
          </Text>
          {/* Favorite heart icon */}
          <MaterialIcons 
            name="favorite-border" 
            size={30} 
            color="black" 
            onPress={() => addToFavorites(productData)} // Add to favorites on press
          />
        </View>

        <Text style={styles.productCategory}>Category: {category}</Text>
        <Text style={styles.productPrice}>₹ {price}</Text>
        <Text style={styles.productDescription}>{description}</Text>

        {/* Additional product details */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <MaterialIcons name="spa" size={24} color="green" />
            <Text>100% Organic</Text>
          </View>
          <View style={styles.detailItem}>
            <MaterialIcons name="date-range" size={24} color="blue" />
            <Text>1 Year Expiration</Text>
          </View>
          <View style={styles.detailItem}>
            <MaterialIcons name="star" size={24} color="orange" />
            <Text>4.8 (256)</Text>
          </View>
          <View style={styles.detailItem}>
            <MaterialIcons name="local-fire-department" size={24} color="red" />
            <Text>80 kcal/100g</Text>
          </View>
        </View>

        {/* Add to cart button */}
        <View style={styles.addButtonContainer}>
          {isProductInCart ? (
            <TouchableOpacity style={styles.disabledButton} disabled={true}>
              <Text style={styles.disabledButtonText}>Đã thêm vào giỏ hàng</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => addToCart(productData)}
            >
              <Text style={styles.addButtonText}>Thêm vào giỏ hàng</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  productImage: {
    height: 300,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  topIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    width: "100%",
    paddingHorizontal: 15,
    alignItems: "center",
  },
  infoContainer: {
    paddingHorizontal: 15,
    backgroundColor: "white",
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productTitle: {
    fontSize: 25,
    color: "black",
    fontWeight: "600",
  },
  productCategory: {
    marginTop: 5,
    fontSize: 15,
    color: "grey",
  },
  productPrice: {
    marginTop: 5,
    fontSize: 28,
    color: "black",
    fontWeight: "bold",
  },
  productDescription: {
    marginTop: 10,
    fontSize: 15,
    color: "grey",
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  detailItem: {
    alignItems: "center",
  },
  addButtonContainer: {
    flex: 0.9,
    justifyContent: "flex-end",
  },
  addButton: {
    backgroundColor: myColors.primary,
    borderRadius: 10,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  disabledButton: {
    backgroundColor: "#E3E3E3",
    borderRadius: 10,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButtonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default Details;
