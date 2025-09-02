import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../utils/type";
import { loginUser } from "./authAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

//
export const login = createAsyncThunk<
  User, // return type
  { username: string; password: string }, // params type
  { rejectValue: string } // error type
>("auth/login", async ({ username, password }, { rejectWithValue }) => {
  try {
    const data = await loginUser(username, password);
    await AsyncStorage.multiSet([
      ["accessToken", data.accessToken],
      ["refreshToken", data.refreshToken],
      ["user", JSON.stringify(data)],
    ]);

    return data;
  } catch (err: any) {
    // Axios error
    if (err.response && err.response.data) {
      return rejectWithValue(err.response.data.message || "Login failed");
    }
    return rejectWithValue(err.message || "Network error");
  }
});

//
export const loadUser = createAsyncThunk<User | null>(
  "auth/loadUser",
  async () => {
    const userStr = await AsyncStorage.getItem("user");
    console.log(userStr);

    if (userStr) {
      return JSON.parse(userStr) as User;
    }
    return null;
  }
);

//  logout thunk (clear AsyncStorage)
export const logout = createAsyncThunk("auth/logout", async () => {
  await AsyncStorage.multiRemove(["accessToken", "refreshToken", "user"]);
});

//
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // login.pending
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // login.fulfilled
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      // login.rejected
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
      })
      // loadUser
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export default authSlice.reducer;
