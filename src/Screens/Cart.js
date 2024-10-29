import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { myColors } from "../Utils/MyColors";
import { useNavigation } from "@react-navigation/native";

const Cart = () => {
  const [cartData, setCartData] = useState([]); // State để lưu dữ liệu giỏ hàng
  const [loading, setLoading] = useState(true); // State cho trạng thái loading
  const nav = useNavigation();

  // Lấy dữ liệu giỏ hàng từ Fake Store API
  useEffect(() => {
    fetch("https://fakestoreapi.com/carts/user/1") // Thay bằng user ID của bạn
      .then((res) => res.json())
      .then((data) => {
        const cartItems = data[0].products.map(async (cartItem) => {
          // Fetch thông tin sản phẩm chi tiết để lấy ảnh và giá
          const productRes = await fetch(
            `https://fakestoreapi.com/products/${cartItem.productId}`
          );
          const productData = await productRes.json();
          return {
            ...cartItem,
            title: productData.title,
            image: productData.image, // Đường dẫn hình ảnh
            price: productData.price, // Giá của sản phẩm từ API
          };
        });
        Promise.all(cartItems).then((items) => {
          setCartData(items); // Lưu dữ liệu vào state
          setLoading(false);
        });
      })
      .catch((error) => {
        Alert.alert("Lỗi", "Không thể tải dữ liệu giỏ hàng");
        setLoading(false);
      });
  }, []);

  // Hàm tính tổng tiền
  const calculateTotal = () => {
    let total = 0;
    cartData.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total.toFixed(2); // Trả về giá trị với 2 chữ số thập phân
  };

  // Hàm cập nhật số lượng sản phẩm
  const updateQuantity = (productId, quantityChange) => {
    const updatedCartData = cartData.map((item) => {
      if (item.productId === productId) {
        const newQuantity = item.quantity + quantityChange;
        if (newQuantity > 0) {
          return { ...item, quantity: newQuantity };
        }
      }
      return item;
    });
    setCartData(updatedCartData);
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (productId) => {
    const updatedCartData = cartData.filter((item) => item.productId !== productId);
    setCartData(updatedCartData);
  };

  // Hàm xóa toàn bộ giỏ hàng sau khi thanh toán
  const clearCartAfterCheckout = () => {
    // Xóa sản phẩm cục bộ
    setCartData([]);

    // Gọi API để xóa hết sản phẩm trong giỏ hàng
    fetch(`https://fakestoreapi.com/carts/7`, {
      method: "PUT",
      body: JSON.stringify({
        userId: 1,
        products: [], // Xóa hết sản phẩm bằng cách gửi mảng rỗng
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("Cart cleared:", json);
        Alert.alert("Thanh Toán", "Đã thanh toán thành công!");
        nav.navigate("OrderPlaced"); // Điều hướng đến trang đã đặt hàng
      })
      .catch((error) => {
        Alert.alert("Error", "Failed to clear cart");
      });
  };

  // Nếu đang tải dữ liệu, hiển thị loading
  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Đang tải...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Giỏ hàng</Text>

      <View style={styles.cartList}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={cartData}
          keyExtractor={(item) => item.productId.toString()}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              {/* Hình ảnh sản phẩm */}
              <Image
                style={styles.productImage}
                source={{
                  uri: item.image, // URL đầy đủ của hình ảnh sản phẩm từ API
                }}
              />

              {/* Thông tin sản phẩm */}
              <View style={styles.productDetails}>
                <View style={styles.productTitleRow}>
                  <Text style={styles.productTitle}>
                    {item.title} {/* Tên sản phẩm */}
                  </Text>
                  <TouchableOpacity
                    onPress={() => removeFromCart(item.productId)} // Xóa sản phẩm
                  >
                    <AntDesign name="close" size={24} color="grey" />
                  </TouchableOpacity>
                </View>

                <Text style={styles.productQuantity}>
                  Số lượng: {item.quantity}
                </Text>

                {/* Điều chỉnh số lượng */}
                <View style={styles.quantityRow}>
                  <View style={styles.quantityControl}>
                    <AntDesign
                      name="minuscircleo"
                      size={24}
                      color={myColors.primary}
                      onPress={() => updateQuantity(item.productId, -1)} // Giảm số lượng
                    />
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <AntDesign
                      name="pluscircleo"
                      size={24}
                      color={myColors.primary}
                      onPress={() => updateQuantity(item.productId, 1)} // Tăng số lượng
                    />
                  </View>

                  {/* Hiển thị giá sản phẩm */}
                  <Text style={styles.productPrice}>
                    ₹ {(item.quantity * item.price).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>

      {/* Nút thanh toán */}
      <TouchableOpacity
        onPress={clearCartAfterCheckout} // Gọi hàm xóa giỏ hàng sau khi thanh toán
        style={styles.checkoutButton}
      >
        <Text style={styles.checkoutButtonText}>Thanh Toán</Text>
        <Text style={styles.checkoutButtonText}>₹ {calculateTotal()}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "white",
    paddingVertical: 15,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 15,
  },
  cartList: {
    flex: 0.9,
  },
  cartItem: {
    flexDirection: "row",
    borderBottomColor: "#E3E3E3",
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginRight: 15,
  },
  productDetails: {
    flex: 1,
    justifyContent: "space-between",
  },
  productTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  productQuantity: {
    color: "grey",
    fontSize: 14,
  },
  quantityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "600",
  },
  checkoutButton: {
    backgroundColor: myColors.primary,
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default Cart;
