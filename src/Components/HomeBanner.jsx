import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import { responsiveHeight } from "react-native-responsive-dimensions";

const HomeBanner = () => {
  return (
    <View style={styles.container}>
      <Swiper
        autoplay
        autoplayTimeout={3} // Tự động chuyển sau 3 giây
        showsPagination={true} // Hiển thị các dấu chấm nhỏ chỉ số
        dotStyle={styles.dot} // Chấm không được chọn
        activeDotStyle={styles.activeDot} // Chấm đang được chọn
      >
        <Image
          style={styles.image}
          source={require("../assets/banner1.jpg")}
        />
        <Image
          style={styles.image}
          source={require("../assets/banner2.jpg")}
        />
        <Image
          style={styles.image}
          source={require("../assets/banner3.jpg")}
        />
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(15),
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Đảm bảo ảnh bao phủ toàn bộ vùng chứa
  },
  dot: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: "#000", // Chấm đang được chọn có màu đen
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
});

export default HomeBanner;
