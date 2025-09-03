import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./screens/Login";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect } from "react";
import { loadUser } from "../features/auth/authSlice";
import ProductsListScreen from "./screens/ProductsList";
import ProductDetailsScreen from "./screens/ProductDetails";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const Navigation = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
          <Stack.Screen name="Home" component={ProductsListScreen} />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetailsScreen}
            options={{ title: "Details" }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
