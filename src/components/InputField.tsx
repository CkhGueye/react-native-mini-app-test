import { StyleSheet, TextInput } from "react-native";
import React from "react";
import { COLORS } from "../utils/colors";

const InputField = ({
  placeholder,
  secureTextEntry = false,
  value,
  onChangeText,
}: {
  placeholder: string;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (text: string) => void;
}) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    secureTextEntry={secureTextEntry}
    value={value}
    onChangeText={onChangeText}
    placeholderTextColor="#999"
  />
);

export default InputField;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    // borderColor: COLORS.primary,
    borderColor: COLORS.secondary,
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
    backgroundColor: COLORS.secondary,
    fontSize: 16,
  },
});
