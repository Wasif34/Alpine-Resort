import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addRoom } from "../services/apiRooms";
import toast from "react-hot-toast";

export function useCreateRoom() {
  const queryClient = useQueryClient();
  const { mutate: createRoom, isLoading } = useMutation({
    mutationFn: addRoom,
    onSuccess: () => {
      toast.success("Room created successfully!");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createRoom, isLoading };
}
