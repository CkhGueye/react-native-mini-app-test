import axios, { AxiosResponse } from "axios";
import { User } from "../../utils/type";

export async function loginUser(
  username: string,
  password: string
): Promise<User> {
  const response: AxiosResponse<User> = await axios.post(
    "https://dummyjson.com/auth/login",
    {
      username,
      password,
      expiresInMins: 30, // optional, defaults to 60
    },
    {
      withCredentials: false, // cookies
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.data;
}
