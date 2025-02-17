import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation({
    mutationFn: (id) => deleteBooking(id),
    onSuccess: () => {
      toast.success("Booking deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      navigate("/bookings");
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });

  return { isLoading, deleteBooking: mutate };
}
