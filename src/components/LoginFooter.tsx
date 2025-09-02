import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const LoginFooter = ({
  text,
  linkText,
  onPress,
}: {
  text: string;
  linkText: string;
  onPress: () => void;
}) => (
  <View
    style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}
  >
    <Text style={{ color: "#555" }}>{text} </Text>
    <TouchableOpacity onPress={onPress}>
      <Text style={{ color: "#0047FF", fontWeight: "600" }}>{linkText}</Text>
    </TouchableOpacity>
  </View>
);

export default LoginFooter;

const styles = StyleSheet.create({});
