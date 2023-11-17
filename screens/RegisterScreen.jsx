import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [value, setValue] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const storedData = await AsyncStorage.getItem("userDetails");
      const parsedData = storedData ? JSON.parse(storedData) : [];

      const existingData = Array.isArray(parsedData) ? parsedData : [];

      const isNameExists = existingData.some((user) => user.name === name);
      const isEmailExists = existingData.some((user) => user.email === email);

      if (!name.trim() || !email.trim() || !password.trim()) {
        setErrorMessage("Please Enter all the fields");
        return;
      }

      if (isNameExists) {
        setErrorMessage("name already exists. Please use a different name.");
        return;
      }

      if (isEmailExists) {
        setErrorMessage("Email already exists. Please use a different email.");
        return;
      }

      const newUserDetails = { name, email, password };

      const updatedData = [...existingData, newUserDetails];

      await AsyncStorage.setItem("userDetails", JSON.stringify(updatedData));
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Successfully User Registered",
        onHide: () => {
          navigation.navigate("Login");
        },
      });
      setErrorMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Toast />
      <Text style={styles.title}>User Registration</Text>
      <View style={styles.inputContainer}>
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="grey"
          value={name}
          onChangeText={(text) => {
            setName(text);
            setErrorMessage("");
          }}
        />
      </View>
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
            setErrorMessage("");
          }}
        />
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
            setErrorMessage("");
          }}
        />
      </View>
      <View style={styles.buttonView}>
        {/* {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null} */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginLink}>
            Already registered? Click here to Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    marginTop: 10,
  },
});

export default RegistrationScreen;
