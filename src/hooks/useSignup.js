import { useMutation } from "@tanstack/react-query";
import { signup as signupAPI } from "../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupAPI,
    onSuccess: (data) => {
      toast.success("Signup successful! Please verify your email.");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return { signup, isLoading };
}
