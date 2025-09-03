import { Text } from "@react-navigation/elements";
import { StyleSheet, View } from "react-native";
import PrimaryButton from "../../components/PrimaryButton";
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";

export default function Settings() {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
      <PrimaryButton label="Sign Out" onPress={() => dispatch(logout())} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
});
