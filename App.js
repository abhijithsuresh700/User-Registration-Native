import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from "./navigation/StackNavigator"

export default function App() {
  return (
    <>
    <StatusBar style={styles.container}/>
      <StackNavigator/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
