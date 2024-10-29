import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { myColors } from "../Utils/MyColors";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

const Orderplaced = () => {
  const nav = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      nav.navigate("Home");
    }, 8000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar backgroundColor="white" />
      <MaterialIcons name="verified" size={90} color={myColors.primary} />
      <Text style={{ fontSize: 20, textAlign: "center" }}>
        Congrats, Your Order Placed Successfully!!
      </Text>
      <Image
        source={require("../assets/order.gif")} // Đường dẫn tới file gif của bạn
        style={{ width: 200, height: 200, marginTop: 20 }}
        resizeMode="cover"
      />
    </View>
  );
};

export default Orderplaced;
