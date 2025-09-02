import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { Navigation } from "./navigation";

SplashScreen.preventAutoHideAsync();

export function App() {
  return <Navigation />;
}
