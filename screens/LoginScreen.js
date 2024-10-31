import React, { useReducer, useCallback } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getFirebaseApp } from "../utils/firebaseHelper";
import { authenticate } from "../store/authSlice";
import { reducer } from "../utils/reducers/formReducers";
import { validateInput } from "../utils/actions/formActions";

const initialState = {
  inputValues: {
    email: "",
    password: "",
  },
  inputValidities: {
    email: false,
    password: false,
  },
  formIsValid: false,
};

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const validationResult = validateInput(inputId, inputValue);
      dispatchFormState({
        inputId,
        validationResult,
        inputValue,
      });
    },
    [dispatchFormState]
  );

  const handleLogin = async () => {
    const { email, password } = formState.inputValues;

    console.log("email", email);
    console.log("password", password);

    if (!formState.formIsValid) {
      Alert.alert("Lỗi", "Vui lòng nhập cả email và mật khẩu.");
      return;
    }

    try {
      const auth = getAuth(getFirebaseApp());
      const result = await signInWithEmailAndPassword(auth, email, password);
      const { uid, stsTokenManager } = result.user;
      const { accessToken } = stsTokenManager;

      dispatch(authenticate({ token: accessToken, userData: { uid, email } }));
      Alert.alert("Đăng nhập thành công");
      navigation.navigate("Main");
    } catch (error) {
      // Xử lý lỗi nếu đăng nhập không thành công
      let message = "Đã xảy ra lỗi trong quá trình đăng nhập";
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        message = "Email hoặc mật khẩu không hợp lệ";
      }
      Alert.alert("Đăng nhập không thành công", message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Màn hình đăng nhập</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        <Text style={styles.registerText}>Bạn chưa có tài khoản? Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

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
  registerButton: {
    marginTop: 20,
  },
  registerText: {
    color: "#003580",
    fontSize: 16,
  },
});
