import React, { useEffect } from "react";
import { View, Text, Image, ActivityIndicator, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchProductById } from "../../features/products/productsSlice";
import { COLORS } from "../../utils/colors";

interface Props extends NativeStackScreenProps<any, any> {}

export default function ProductDetails({ route }: Props) {
  const { id } = route.params as { id: number };
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.products.byId[id]);
  const loading = useAppSelector((state) => state.products.loading && !product);

  useEffect(() => {
    if (!product) dispatch(fetchProductById(id));
  }, [id]);

  if (!product && loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!product) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <Text>Product not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: COLORS.white, margin: 12 }}
      contentContainerStyle={{ padding: 16, gap: 12 }}
    >
      <Image
        source={{ uri: product.thumbnail }}
        style={{ width: "100%", height: 220, borderRadius: 12 }}
      />
      <Text style={{ fontSize: 20, fontWeight: "700" }}>{product.title}</Text>
      <Text>${product.price}</Text>
      <Text style={{ color: COLORS.gray }}>{product.description}</Text>
    </ScrollView>
  );
}
