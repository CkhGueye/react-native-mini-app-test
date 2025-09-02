import axios, { AxiosResponse } from "axios";
import { User } from "../../utils/type";

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

export async function loginUser(
  username: string,
  password: string
): Promise<User> {
  const response: AxiosResponse<User> = await axios.post(
    `${baseUrl}/auth/login`,
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
