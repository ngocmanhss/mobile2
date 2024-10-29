import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Intro = () => {
  const navigation = useNavigation();

  // Tự động điều hướng sau 5 giây
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 5000); // Thời gian delay 5 giây

    return () => clearTimeout(timer); // Clear timer nếu component unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/5eeea355389655.59822ff824b72.gif')}
      />
      <Text style={styles.title}>Welcome!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  title: {
    fontSize: 30,
    color: '#000', // Màu chữ là đen để hiển thị rõ ràng
    textAlign: 'center',
    marginTop: 20, // Khoảng cách giữa text và image
  },
});

export default Intro;
