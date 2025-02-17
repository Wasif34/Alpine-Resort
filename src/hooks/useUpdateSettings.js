import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { updateSetting as updates } from "../services/apiSettings";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { reset } = useForm();
  const { mutate: updateSetting, isLoading: isEditing } = useMutation({
    mutationFn: updates,
    onSuccess: () => {
      toast.success("Settings updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isEditing, updateSetting };
}
