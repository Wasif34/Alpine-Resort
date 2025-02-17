import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { addRoom } from "../services/apiRooms";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

export function useUpdateRoom() {
  const queryClient = useQueryClient();
  const { reset } = useForm();
  const { mutate: updateRoom, isLoading: isEditing } = useMutation({
    mutationFn: ({ id, ...data }) => addRoom(data, id),
    onSuccess: () => {
      toast.success("Room updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isEditing, updateRoom };
}
