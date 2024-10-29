import { View, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";  // Sử dụng điều hướng
import HomeIcon from "../Components/HomeIcon";
import HomeSearch from "../Components/HomeSearch";
import HomeBanner from "../Components/HomeBanner";
import Category from "../Components/Category";  // Thành phần danh mục cuộn ngang
import ProductsCarousel from "../Components/ProductsCarousel";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [bestSelling, setBestSelling] = useState([]);
  const navigation = useNavigation();  // Sử dụng điều hướng

  // Gọi API để lấy danh mục và sản phẩm
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));

    fetch("https://fakestoreapi.com/products?sort=desc")
      .then((res) => res.json())
      .then((data) => setBestSelling(data.slice(0, 5)));
  }, []);

  const handleCategoryPress = (category) => {
    // Điều hướng đến màn hình CategoryProducts và truyền category vào
    navigation.navigate("CategoryProducts", { category });
  };

  const handleViewAllPress = () => {
    console.log("View All Categories pressed");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, paddingHorizontal: 20, paddingTop: 10 }}
      >
        <View style={{ gap: 20, paddingBottom: 20 }}>
          <HomeIcon />
          <HomeSearch />
          <HomeBanner />
          
          <Text style={{ fontSize: 20, fontWeight: "600" }}>Categories</Text>
          <Category 
            categories={categories} 
            onPress={handleCategoryPress} 
            onViewAllPress={handleViewAllPress} 
          />

          <Text style={{ fontSize: 20, fontWeight: "600", marginTop: 10 }}>Best Selling</Text>
          <ProductsCarousel data={bestSelling} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
