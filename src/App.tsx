import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { Navigation } from "./navigation";
import { Provider } from "react-redux";
import { store } from "./app/store";
import GlobalModal from "./components/GlobalModal";

SplashScreen.preventAutoHideAsync();

export function App() {
  return (
    <Provider store={store}>
      <Navigation />
      <GlobalModal />
    </Provider>
  );
}
