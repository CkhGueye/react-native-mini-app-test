import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { Navigation } from "./navigation";
import { Provider } from "react-redux";
import { store } from "./app/store";

SplashScreen.preventAutoHideAsync();

export function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
