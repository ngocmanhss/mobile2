import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Để điều hướng sau khi đăng xuất

const Profile = () => {
  const [user, setUser] = useState(null); // State để lưu thông tin người dùng
  const [loading, setLoading] = useState(true); // State để hiển thị trạng thái loading
  const navigation = useNavigation(); // Khởi tạo điều hướng

  // Hàm lấy thông tin người dùng từ Fake Store API
  useEffect(() => {
    fetch('https://fakestoreapi.com/users/1') // Lấy thông tin người dùng có ID là 1
      .then(res => res.json())
      .then(data => {
        setUser(data); // Lưu dữ liệu người dùng vào state
        setLoading(false); // Tắt trạng thái loading
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  // Hàm đăng xuất
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token'); // Xóa token hoặc bất kỳ dữ liệu nào khác liên quan đến đăng nhập
      navigation.replace('Login'); // Điều hướng về màn hình Login
    } catch (e) {
      Alert.alert("Lỗi đăng xuất", "Không thể đăng xuất!");
    }
  };

  // Kiểm tra nếu dữ liệu đang tải
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#33c37d" />
      </View>
    );
  }

  // Kiểm tra nếu không có dữ liệu
  if (!user) {
    return (
      <View style={styles.loaderContainer}>
        <Text>Không thể tải thông tin người dùng!</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Background image */}
      <View style={styles.backgroundImageContainer}>
        <Image source={require("../assets/thaydat.jpg")} style={styles.backgroundImage} />
      </View>

      {/* User info */}
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{user.name.firstname} {user.name.lastname}</Text>
        <Text style={styles.userDetail}>Username: {user.username}</Text>
      </View>

      {/* Account Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin tài khoản</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoValue}>{user.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Số điện thoại:</Text>
          <Text style={styles.infoValue}>{user.phone}</Text>
        </View>
      </View>

      {/* Address Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Địa chỉ</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Số nhà, đường:</Text>
          <Text style={styles.infoValue}>{user.address.number}, {user.address.street}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Thành phố:</Text>
          <Text style={styles.infoValue}>{user.address.city}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Mã Zip:</Text>
          <Text style={styles.infoValue}>{user.address.zipcode}</Text>
        </View>
      </View>

      {/* Geolocation Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vị trí địa lý</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Vĩ độ:</Text>
          <Text style={styles.infoValue}>{user.address.geolocation.lat}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Kinh độ:</Text>
          <Text style={styles.infoValue}>{user.address.geolocation.long}</Text>
        </View>
      </View>

      {/* Nút Đăng Xuất */}
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImageContainer: {
    height: 200,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  userInfo: {
    alignItems: 'center',
    marginVertical: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  userDetail: {
    fontSize: 16,
    color: '#777',
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 15,
    marginHorizontal: 20,
    marginTop: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Profile;
