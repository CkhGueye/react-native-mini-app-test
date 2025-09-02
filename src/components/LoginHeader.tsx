import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../utils/colors";

// 🔹 LoginHeader
const LoginHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => (
  <View style={{ marginBottom: 30, alignItems: "center" }}>
    <Text style={styles.headerTitle}>{title}</Text>
    <Text style={styles.headerSubtitle}>{subtitle}</Text>
  </View>
);

export default LoginHeader;

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: COLORS.text,
  },
});
