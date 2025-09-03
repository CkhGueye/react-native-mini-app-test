import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { COLORS } from "../utils/colors";

const PrimaryButton = ({
  label,
  onPress,
  loading,
}: {
  label: string;
  onPress: () => void;
  loading?: boolean;
}) => (
  <TouchableOpacity style={styles.primaryBtn} onPress={onPress}>
    {!loading ? (
      <Text style={styles.primaryBtnText}>{label}</Text>
    ) : (
      <ActivityIndicator color={COLORS.white} />
    )}
  </TouchableOpacity>
);

export default PrimaryButton;

const styles = StyleSheet.create({
  primaryBtn: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  primaryBtnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
