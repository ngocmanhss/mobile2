import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { myColors } from './../Utils/MyColors';  // Sử dụng màu từ tệp màu
import FontAwesome from 'react-native-vector-icons/FontAwesome';  // Import FontAwesome icons

const Category = ({ categories, onPress }) => {
  // Một số biểu tượng tương ứng với các danh mục (hoặc bạn có thể chọn icon khác theo sở thích)
  const categoryIcons = {
    electronics: "mobile",  // Điện thoại hoặc thiết bị điện tử
    jewelery: "diamond",    // Trang sức
    "men's clothing": "male",   // Quần áo nam
    "women's clothing": "female", // Quần áo nữ
  };

  return (
    <View style={{ marginVertical: 10, paddingHorizontal: 20 }}>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap", // Cho phép các mục xuống dòng nếu không đủ không gian
          justifyContent: "space-between", // Căn đều khoảng cách giữa các mục
        }}
      >
        {categories.map((category, index) => (
          <TouchableOpacity 
            key={index} 
            onPress={() => onPress(category)} 
            style={{
              alignItems: 'center',
              width: '22%',  // Chiếm 22% chiều rộng của màn hình để tạo khoảng cách đều
              marginVertical: 10,  // Khoảng cách trên dưới giữa các mục
            }}
          >
            <View 
              style={{
                backgroundColor: myColors.primary, // màu nền tròn
                borderRadius: 50,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                width: 70,
                height: 70,
              }}
            >
              {/* Sử dụng icon tương ứng với từng danh mục */}
              <FontAwesome 
                name={categoryIcons[category] || 'question-circle'}  // Sử dụng icon mặc định nếu không tìm thấy
                size={40} 
                color="white"  // Màu icon
              />
            </View>
            <Text style={{ fontSize: 14, marginTop: 5, textAlign: 'center' }}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Category;
