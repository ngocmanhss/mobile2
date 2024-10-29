import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { FontAwesome } from "@expo/vector-icons";
import { myColors } from "./../Utils/MyColors";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../Redux/CartSlice";

const ProductsCarousel = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);  // Thêm state để xử lý loading
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state.CartSlice);
  const nav = useNavigation();

  // Fetch sản phẩm từ Fake Store API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);  // Lưu dữ liệu sản phẩm vào state
        setLoading(false);  // Tắt loading khi dữ liệu được tải
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color={myColors.primary} />;
  }

  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={products}  // Sử dụng dữ liệu từ API
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              nav.navigate("Details", {
                main: item,
              });
            }}
            activeOpacity={0.7}
            style={{
              height: responsiveHeight(28),
              borderWidth: 2,
              borderColor: "#E3E3E3",
              width: responsiveWidth(45),
              marginRight: 15,
              borderRadius: 15,
            }}
          >
            <Image
              style={{
                height: 125,
                width: 125,
                alignSelf: "center",
                resizeMode: "contain",
              }}
              source={{ uri: item.image }}  // Hiển thị hình ảnh từ Fake Store API
            />
            <View style={{ paddingHorizontal: 10, gap: 3 }}>
              <Text style={{ fontSize: 18, fontWeight: "600" }}>
                {item.title}
              </Text>
              <Text style={{ color: "grey" }}>Category: {item.category}</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  ₹ {item.price}
                </Text>
                {storeData.some((value) => value.id == item.id) ? (
                  <FontAwesome
                    name="minus-square"
                    size={33}
                    color={myColors.primary}
                    onPress={() => {
                      dispatch(removeFromCart(item));
                    }}
                  />
                ) : (
                  <FontAwesome
                    name="plus-square"
                    size={33}
                    color={myColors.primary}
                    onPress={() => {
                      dispatch(addToCart(item));
                    }}
                  />
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}  // Thiết lập key cho FlatList
      />
    </View>
  );
};

export default ProductsCarousel;
