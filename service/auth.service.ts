import { Api } from "@/providers";

export const AuthService = {
  async signIn(payload: ILogin) {
    const { data } = await Api.post<ILoginResponse>("/signIn", payload, {
      withCredentials: true,
    });
    return data;
  },
};
