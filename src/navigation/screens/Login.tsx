import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import LoginHeader from "../../components/LoginHeader";
import InputField from "../../components/InputField";
import LinkButton from "../../components/LinkButton";
import PrimaryButton from "../../components/PrimaryButton";
import LoginFooter from "../../components/LoginFooter";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <LoginHeader
        title="Login here"
        subtitle="Welcome back you've been missed!"
      />

      <InputField
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <InputField
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={{ alignItems: "flex-end", marginVertical: 10 }}>
        <LinkButton text="Forgot your password?" onPress={() => {}} />
      </View>

      <PrimaryButton label="Sign in" onPress={() => {}} />

      <LoginFooter
        text="Create new account"
        linkText="Sign up"
        onPress={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    paddingTop: 80,
    backgroundColor: "white",
  },
});
