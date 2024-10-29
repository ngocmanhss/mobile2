import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Alert,
  } from "react-native";
  import React, { useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { StatusBar } from "expo-status-bar";
  import { Ionicons } from "@expo/vector-icons";
  import { useNavigation } from "@react-navigation/native";
  import { sendPasswordResetEmail } from "firebase/auth";
  import { authentication } from "../../Firebaseconfig";
  import { myColors } from "../Utils/MyColors";
  
  const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const nav = useNavigation();
  
    const resetPassword = () => {
      if (!email) {
        Alert.alert("Please enter your email");
        return;
      }
      setLoading(true);
      sendPasswordResetEmail(authentication, email)
        .then(() => {
          Alert.alert("Password reset email sent!");
          nav.navigate("Login"); // Điều hướng quay lại màn hình Đăng nhập
        })
        .catch((error) => {
          if (error.code === "auth/user-not-found") {
            Alert.alert("User not found. Please check the email address.");
          } else {
            Alert.alert("Error resetting password:", error.message);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    };
  
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: myColors.secondary }}>
        <StatusBar />
        <ScrollView style={{ flex: 1, paddingTop: 30 }}>
          <View style={{ paddingHorizontal: 20, marginTop: 50 }}>
            <Text
              style={{ color: myColors.third, fontSize: 24, fontWeight: "500" }}
            >
              Quên Mật Khẩu
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                color: "grey",
                marginTop: 10,
              }}
            >
              Vui lòng nhập email để nhận liên kết đặt lại mật khẩu
            </Text>
  
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: "grey",
                marginTop: 40,
              }}
            >
              Email
            </Text>
            <TextInput
              value={email}
              onChangeText={(val) => setEmail(val)}
              keyboardType="email-address"
              style={{
                borderColor: "#E3E3E3",
                borderBottomWidth: 2,
                fontSize: 16,
                marginTop: 15,
              }}
            />
  
            <TouchableOpacity
              onPress={resetPassword}
              style={{
                backgroundColor: myColors.primary,
                marginTop: 30,
                height: 70,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
              disabled={loading}
            >
              <Text
                style={{
                  fontSize: 19,
                  color: myColors.secondary,
                  fontWeight: "500",
                }}
              >
                {loading ? "Đang xử lý..." : "Gửi yêu cầu"}
              </Text>
            </TouchableOpacity>
  
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
                gap: 5,
              }}
            >
              <Text style={{ fontSize: 16 }}>Nhớ mật khẩu?</Text>
              <TouchableOpacity
                onPress={() => nav.navigate("Login")}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: myColors.primary,
                    fontWeight: "600",
                  }}
                >
                  Đăng Nhập
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default ForgotPassword;
  