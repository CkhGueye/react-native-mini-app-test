import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../app/api";
import { Product, ProductsResponse } from "../../utils/type";

const PAGE_SIZE = 20;

interface ProductsState {
  items: Product[];
  total: number;
  skip: number;
  loading: boolean;
  error: string | null;
  refreshing: boolean;
  hasMore: boolean;
  byId: Record<number, Product | undefined>;
}

const initialState: ProductsState = {
  items: [],
  total: 0,
  skip: 0,
  loading: false,
  error: null,
  refreshing: false,
  hasMore: true,
  byId: {},
};

export const fetchProducts = createAsyncThunk<
  { items: Product[]; total: number; skip: number; append: boolean },
  { skip?: number; append?: boolean },
  { rejectValue: string }
>(
  "products/fetch",
  async ({ skip = 0, append = false } = {}, { rejectWithValue }) => {
    try {
      const { data } = await api.get<ProductsResponse>(`/products`, {
        params: { limit: PAGE_SIZE, skip },
      });
      return { items: data.products, total: data.total, skip, append };
    } catch (e: any) {
      return rejectWithValue(
        e?.response?.data?.message || "Failed to load products"
      );
    }
  }
);

export const fetchProductById = createAsyncThunk<
  Product,
  number,
  { rejectValue: string }
>("products/fetchById", async (id, { rejectWithValue }) => {
  try {
    const { data } = await api.get<Product>(`/products/${id}`);
    return data;
  } catch (e: any) {
    return rejectWithValue(
      e?.response?.data?.message || "Failed to load product"
    );
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    reset(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        const append = action.meta.arg?.append ?? false;
        // distinguish initial load/next page vs pull-to-refresh
        if (
          !append &&
          (action.meta.arg?.skip ?? 0) === 0 &&
          state.items.length > 0
        ) {
          state.refreshing = true;
        } else {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (
          state,
          action: PayloadAction<{
            items: Product[];
            total: number;
            skip: number;
            append: boolean;
          }>
        ) => {
          const { items, total, skip, append } = action.payload;
          state.total = total;
          state.hasMore = skip + items.length < total;
          state.skip = skip + items.length; // next skip value
          state.items = append ? [...state.items, ...items] : items;
          state.loading = false;
          state.refreshing = false;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.refreshing = false;
        state.error = (action.payload as string) || "Something went wrong";
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.byId[action.payload.id] = action.payload;
        state.loading = false;
      });
  },
});

export const { reset } = productsSlice.actions;
export default productsSlice.reducer;
