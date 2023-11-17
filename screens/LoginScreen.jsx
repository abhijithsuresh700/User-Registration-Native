import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  SafeAreaView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userDetails, setUserDetails] = useState(null);

  const handleSubmit = async () => {
    console.log("Email:", email);
    console.log("Password:", password);
    try {
      const storedData = await AsyncStorage.getItem("userDetails");
      const parsedData = storedData ? JSON.parse(storedData) : [];


      const existingData = Array.isArray(parsedData) ? parsedData : [];
      
      const isEmailExists = existingData.some((user) => user.email === email);

      if(!email.trim() || !password.trim()){
        setErrorMessage("Please Enter all the fields")
        return;
      }
      
      if (!isEmailExists) {
          setEmailError("Wrong Email");
          return;
      }

      if (isEmailExists) {
          const matchingUser = existingData.find((user) => user.email === email);
          console.log(matchingUser,"matchingUser")
        setUserDetails(matchingUser);

        if (matchingUser.password === password) {
                  await AsyncStorage.setItem(
        "currentUser",
        JSON.stringify(matchingUser)
      );
          Toast.show({ type: "success", text1: "Success", text2: " Login Succesfully",  
          onHide: () => {navigation.navigate("Home")}});
        } else {
          setPasswordError("Wrong Password");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Toast />
      <Text style={styles.title}>User Login</Text>
      {errorMessage ? (
  <Text style={styles.errorText}>{errorMessage}</Text>
) : null}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="grey"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError("");
            setErrorMessage("");
          }}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="grey"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setPasswordError("");
            setErrorMessage("");
          }}
        />
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.loginLink}>
            Don't have an account? Click here to Register
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    height: "100%",
    width: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 40,
  },
  label: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#333",
    color: "#fff",
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#0066FF",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonView: {
    display: "flex",
    alignItems: "center",
  },
  loginLink: {
    color: "white",
    marginTop: 10,
  },
  errorText: {
    color: "red",
    // marginTop: 10,
  },
});
