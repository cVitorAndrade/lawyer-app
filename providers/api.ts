import axios from "axios";

export const Api = axios.create({
  baseURL: "http://localhost:3333",
});

export const 
setBearerToken = (token: string) => {
  Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
