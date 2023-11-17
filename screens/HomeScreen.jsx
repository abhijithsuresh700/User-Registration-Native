import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Button,
  SafeAreaView,
  ScrollView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [showUsers, setShowUsers] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await AsyncStorage.getItem("userDetails");
        const usersData = JSON.parse(data);
        setRegisteredUsers(usersData);
      } catch (error) {
        console.log(error);
      }
    };
    getData();

   
    const fetchCurrentUser = async () => {
      try {
        const user = await AsyncStorage.getItem("currentUser");
        if (user) {
          setCurrentUser(JSON.parse(user));
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };
    fetchCurrentUser();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("currentUser");
      setCurrentUser(null);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

//   console.log(registeredUsers,"registeredUsers")

//   const handleDeleteAllUsers = async () => {
//     try {
//       await AsyncStorage.removeItem("userDetails");
//       setRegisteredUsers([]);
//       setShowUsers(false);
//     } catch (error) {
//       console.error("Error deleting registered users:", error);
//     }
//   };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {currentUser?.name}</Text>

      <TouchableOpacity
        style={styles.regUsers}
        onPress={() => setShowUsers(!showUsers)}
      >
        <Text style={styles.regUsersText}>
          {showUsers ? "Hide Registered Users" : "Show Registered Users"}
        </Text>
      </TouchableOpacity>

      {showUsers && (
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.columnHeader, { flex: 0.5 }]}>No.</Text>
            <Text style={[styles.columnHeader, { flex: 1 }]}>Name</Text>
            <Text style={[styles.columnHeader, { flex: 1 }]}>Email</Text>
          </View>
          <FlatList
            data={registeredUsers}
            keyExtractor={(item) => item.email}
            renderItem={({ item, index }) => (
              <View style={styles.tableRow}>
                <Text style={[styles.tableRowText, { flex: 0.5 }]}>
                  {index + 1}
                </Text>
                <Text style={styles.tableRowText}>{item.name}</Text>
                <Text style={styles.tableRowText}>{item.email}</Text>
              </View>
            )}
          />
        </View>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
       style={styles.deleteButton}
       onPress={handleDeleteAllUsers}
     >
       <Text style={styles.buttonText}>Delete All Users</Text>
     </TouchableOpacity>  */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingBottom: 25
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 40,
    marginTop: 20
  },
  regUsers: {
    backgroundColor: "#c5dbc5",
    borderRadius: 10,
  },
  regUsersText: {
    color: "#2a912a",
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
  },
  button: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
  },
  columnHeader: {
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  tableRowText: {
    flex: 1,
    color: "#FFFFFF",
  },
  logoutButton: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "red"
  }
});

