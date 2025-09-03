import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./screens/Login";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect, useState } from "react";
import { loadUser } from "../features/auth/authSlice";
import ProductsListScreen from "./screens/ProductsList";
import ProductDetailsScreen from "./screens/ProductDetails";
import Ionicons from "@expo/vector-icons/Ionicons";
import SettingsScreen from "./screens/Settings";
import HomeScreen from "./screens/Home";
import NotificationsScreen from "./screens/Notifications";
import { COLORS } from "../utils/colors";
import LoadingScreen from "../components/Loading";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const Navigation = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      dispatch(loadUser());
    } catch (e) {
      console.error("Failed to load user from storage", e);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  if (loading) return <LoadingScreen />;

  return (
    <NavigationContainer>
      {user ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

const ProductStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Products"
        component={ProductsListScreen}
        options={{ title: "Products" }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{ title: "Details" }}
      />
    </Stack.Navigator>
  );
};

const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "home-outline";

          if (route.name === "ProductsTab") iconName = "pricetag-outline";
          if (route.name === "Profile") iconName = "person-outline";
          if (route.name === "Notifications")
            iconName = "notifications-outline";
          if (route.name === "Settings") iconName = "settings-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="ProductsTab"
        component={ProductStack}
        options={{ title: "Products" }}
      />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};
