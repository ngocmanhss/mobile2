import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './Home'; // Đường dẫn tới component Home
import Cart from './Cart'; // Đường dẫn tới component Cart
import Profile from './Profile'; // Đường dẫn tới component Profile
import Favorite from './Favorite'; // Đường dẫn tới component Favorite
import Voucher from './Voucher'; // Đường dẫn tới component Voucher

const Tab = createBottomTabNavigator();

const HomeTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          } else if (route.name === 'Favorite') {
            iconName = focused ? 'heart' : 'heart-outline'; // Icon trái tim cho Favorite
          } else if (route.name === 'Voucher') {
            iconName = focused ? 'pricetag' : 'pricetag-outline';
          }

          // Trả về biểu tượng theo từng tab
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={Home} options={{ tabBarLabel: 'Trang Chủ' }} />
      <Tab.Screen name="Favorite" component={Favorite} options={{ tabBarLabel: 'Yêu Thích' }} />
      <Tab.Screen name="Cart" component={Cart} options={{ tabBarLabel: 'Giỏ Hàng' }} />
      <Tab.Screen name="Voucher" component={Voucher} options={{ tabBarLabel: 'Voucher' }} />
      <Tab.Screen name="Profile" component={Profile} options={{ tabBarLabel: 'Cá Nhân' }} />
    </Tab.Navigator>
  );
};

export default HomeTab;
