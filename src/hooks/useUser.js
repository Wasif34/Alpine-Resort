import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/apiAuth";
import { is } from "date-fns/locale";
export function useUser() {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false,
  });

  return {
    user,
    isLoading,
    error,
    isAuthenticated: user?.role === "authenticated",
  };
}
