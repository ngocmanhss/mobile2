// OrderHistory.js
import React from 'react';
import { View, Text } from 'react-native';
import { myColors } from '../Utils/MyColors'; // Đường dẫn đến file chứa màu sắc

const OrderHistory = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: myColors.secondary }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: myColors.third }}>
        Lịch Sử Mua Hàng
      </Text>
      {/* Thêm nội dung hiển thị lịch sử mua hàng ở đây */}
    </View>
  );
};

export default OrderHistory;
