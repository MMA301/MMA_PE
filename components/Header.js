import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useDispatch } from "react-redux";
import { logout } from "../utils/actions/authActions";

const Header = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.header}>
      <Text style={styles.title}>Đặt phòng</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <MaterialIcons name="logout" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    backgroundColor: "#003580",
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  button: {
    padding: 10,
  },
});
