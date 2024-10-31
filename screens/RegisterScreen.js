import React, { useReducer, useCallback, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { signUp } from "../utils/actions/authActions";
import { reducer } from "../utils/reducers/formReducers";
import { validateInput } from "../utils/actions/formActions";

const initialState = {
  inputValues: {
    fullName: "",
    email: "",
    password: "",
  },
  inputValidities: {
    fullName: false,
    email: false,
    password: false,
  },
  formIsValid: false,
};

const RegisterScreen = ({ navigation }) => {
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const dispatch = useDispatch();

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  const handleRegister = async () => {
    const { fullName, email, password } = formState.inputValues;

    if (!formState.formIsValid) {
      Alert.alert("Lỗi", "Vui lòng điền chính xác tất cả các trường.");
      return;
    }

    try {
      await dispatch(signUp(fullName, email, password));
      Alert.alert("Thành công", "Tài khoản đã được tạo thành công!");
      navigation.navigate("LoginScreen");
    } catch (error) {
      Alert.alert("Đăng ký không thành công", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Màn hình đăng ký</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={formState.inputValues.fullName}
        onChangeText={(text) => inputChangedHandler("fullName", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formState.inputValues.email}
        onChangeText={(text) => inputChangedHandler("email", text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={formState.inputValues.password}
        onChangeText={(text) => inputChangedHandler("password", text)}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Đăng ký</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text style={styles.loginText}>Đã có tài khoản? Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#ffffff",
  },
  button: {
    backgroundColor: "#003580",
    padding: 10,
    borderRadius: 5,
    width: "100%",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "center",
  },
  loginButton: {
    marginTop: 20,
  },
  loginText: {
    color: "#003580",
    fontSize: 16,
  },
});
