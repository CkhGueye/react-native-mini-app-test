import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../utils/colors";

const LinkButton = ({
  text,
  onPress,
}: {
  text: string;
  onPress: () => void;
}) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.linkText}>{text}</Text>
  </TouchableOpacity>
);

export default LinkButton;

const styles = StyleSheet.create({
  linkText: {
    color: COLORS.primary,
    fontWeight: "500",
  },
});
