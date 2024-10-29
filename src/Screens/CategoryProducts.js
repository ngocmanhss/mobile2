import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";  // Sử dụng để điều hướng
import { Ionicons } from "@expo/vector-icons";

const CategoryProducts = () => {
  const route = useRoute();  // Lấy tham số từ route
  const { category } = route.params;  // Lấy giá trị category từ route
  const navigation = useNavigation();  // Điều hướng đến trang chi tiết
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Gọi API để lấy sản phẩm thuộc danh mục đã chọn
    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [category]);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00ff00" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
      {/* Tiêu đề */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Ionicons name="chevron-back" size={28} onPress={() => navigation.goBack()} />
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
        <Ionicons name="search-outline" size={28} />
      </View>

      {/* Danh sách sản phẩm */}
      <FlatList
        data={products}
        numColumns={2}  // Hiển thị sản phẩm theo dạng lưới với 2 cột
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              width: "48%",  // Đảm bảo sản phẩm chiếm 48% chiều rộng của màn hình
              backgroundColor: "#f4f4f4",
              borderRadius: 10,
              padding: 10,
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("Details", { main: item })}  // Điều hướng đến trang chi tiết
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: 100, height: 100, marginBottom: 10 }}
              resizeMode="contain"
            />
            <Text style={{ fontSize: 16, fontWeight: "600", textAlign: "center", marginBottom: 5 }}>
              {item.title}
            </Text>
            <Text style={{ color: "red", fontWeight: "bold" }}>1kg, ${item.price}</Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#00C569",
                borderRadius: 20,
                padding: 10,
                marginTop: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default CategoryProducts;
