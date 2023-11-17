import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegisterScreen';
import { useEffect, useState } from 'react';

export default function App() {
    const Stack = createNativeStackNavigator();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        setIsLoggedIn(true);
      }, []);
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Register' headerMode="none">
            <Stack.Screen name='Home' options={{ headerShown: false }} component={HomeScreen} />
            <Stack.Screen name='Login' options={{ headerShown: false }} component={LoginScreen} />
            <Stack.Screen name='Register' options={{ headerShown: false }} component={RegistrationScreen} /> 
        </Stack.Navigator>
    </NavigationContainer>
  );
}