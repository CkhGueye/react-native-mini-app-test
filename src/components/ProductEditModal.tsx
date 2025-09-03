import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useAppDispatch } from "../app/hooks";
import { editProduct } from "../features/products/productsSlice";
import { closeModal } from "../features/modal/modalSlice";
import { COLORS } from "../utils/colors";

interface Props {
  id: number;
  title?: string;
}

export default function ProductEditModal({ id, title = "" }: Props) {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>(title);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSave = async () => {
    if (!value.trim()) {
      setError("Title cannot be empty");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await dispatch(
        editProduct({ id, changes: { title: value.trim() } })
      ).unwrap();
      // success close modal
      dispatch(closeModal());
    } catch (err: any) {
      setError(err || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Text style={styles.heading}>Edit product title</Text>

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        placeholder="New title"
        editable={!loading}
      />

      {error ? <Text style={styles.errText}>{error}</Text> : null}

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => dispatch(closeModal())}
          disabled={loading}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.saveBtn}
          onPress={onSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.saveText}>Save</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 8,
  },
  errText: { color: COLORS.error, marginBottom: 6 },
  row: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 8,
  },
  cancelBtn: { paddingVertical: 10, paddingHorizontal: 14 },
  cancelText: { color: COLORS.gray },
  saveBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  saveText: { color: COLORS.white, fontWeight: "600" },
});
