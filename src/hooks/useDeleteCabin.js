import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRoom } from "../services/apiRooms";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: deleteRoom,
    onSuccess: () => {
      toast.success("Room deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isLoading, deleteCabin: mutate };
}
