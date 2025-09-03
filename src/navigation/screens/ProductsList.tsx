import React, { useCallback, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchProducts } from "../../features/products/productsSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Product } from "../../utils/type";
import { COLORS } from "../../utils/colors";

interface Props extends NativeStackScreenProps<any, any> {}

export default function ProductList({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const { items, loading, error, hasMore, skip, refreshing } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts({ skip: 0, append: false }));
    }
  }, []);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    dispatch(fetchProducts({ skip, append: true }));
  }, [loading, hasMore, skip]);

  const onRefresh = useCallback(() => {
    dispatch(fetchProducts({ skip: 0, append: false }));
  }, []);

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        padding: 12,
        gap: 12,
        backgroundColor: "#fff",
      }}
      onPress={() => navigation.navigate("ProductDetails", { id: item.id })}
    >
      <Image
        source={{ uri: item.thumbnail }}
        style={{ width: 80, height: 80, borderRadius: 8 }}
      />
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "600", fontSize: 16 }} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={{ color: COLORS.gray }} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={{ marginTop: 6 }}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  if (error && items.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <Text style={{ color: COLORS.error, marginBottom: 12 }}>{error}</Text>
        <TouchableOpacity
          onPress={() => dispatch(fetchProducts({ skip: 0, append: false }))}
        >
          <Text style={{ color: COLORS.primary, fontWeight: "600" }}>
            Retry
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 12, gap: 12 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onEndReachedThreshold={0.4}
      onEndReached={loadMore}
      ListFooterComponent={
        loading && items.length > 0 ? (
          <View style={{ paddingVertical: 16 }}>
            <ActivityIndicator />
          </View>
        ) : null
      }
      ListEmptyComponent={
        loading ? (
          <View style={{ paddingTop: 40 }}>
            <ActivityIndicator />
          </View>
        ) : null
      }
    />
  );
}
