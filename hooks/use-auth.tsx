import { setBearerToken } from "@/providers/api";
import { AuthService } from "@/service/auth.service";

export function useAuth() {
  const onAuth = async ({ email, password }: ILogin) => {
    const { access_token } = await AuthService.signIn({ email, password });
    setBearerToken(access_token);
  };

  return { onAuth };
}
