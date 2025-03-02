import { setBearerToken } from "@/providers/api";
import { AuthService } from "@/service/auth.service";

export function useAuth() {
  const onAuth = async ({ email, password }: ILogin) => {
    try {
      const { access_token } = await AuthService.signIn({ email, password });
      setBearerToken(access_token);
    } catch (error) {
      console.log("useAuth - onAuth: ", error);
    }
  };

  return { onAuth };
}
