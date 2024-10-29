import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Favorite = () => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const navigation = useNavigation();

  // Hàm tải danh sách yêu thích từ AsyncStorage
  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavoriteItems(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách yêu thích:", error);
    }
  };

  // Gọi hàm tải danh sách yêu thích mỗi khi màn hình focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadFavorites);
    return unsubscribe;
  }, [navigation]);

  // Xóa sản phẩm khỏi danh sách yêu thích
  const removeFromFavorites = async (product) => {
    const updatedFavorites = favoriteItems.filter(item => item.id !== product.id);
    setFavoriteItems(updatedFavorites);
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      Alert.alert("Thành công", "Sản phẩm đã được xóa khỏi yêu thích!");
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm khỏi yêu thích:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Danh sách yêu thích</Text>

      {favoriteItems.length > 0 ? (
        <FlatList
          data={favoriteItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.favoriteItem}>
              <Image
                source={{ uri: item.image }}
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productPrice}>Giá: ₹{item.price}</Text>
              </View>
              <TouchableOpacity onPress={() => removeFromFavorites(item)}>
                <AntDesign name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>
          Bạn chưa có sản phẩm nào trong danh sách yêu thích.
        </Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  favoriteItem: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  productInfo: {
    flex: 1,
    marginLeft: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    color: 'gray',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Favorite;
