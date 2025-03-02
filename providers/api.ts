import axios from "axios";
import Cookies from "js-cookie";

export const Api = axios.create({
  baseURL: "http://localhost:3333",
});

export const setBearerToken = (token?: string) => {
  const accessToken = token || Cookies.get("access_token");
  if (accessToken) {
    Api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  } else {
    delete Api.defaults.headers.common["Authorization"];
  }
};
