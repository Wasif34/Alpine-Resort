import { useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../services/apiBookings";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { redirect, Router, useNavigate } from "react-router-dom";
export function useCheckOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation({
    mutationFn: (bookingId) => {
      updateBooking(bookingId, {
        status: "checked-out",
      });
    },

    onSuccess: (data) => {
      toast.success(`Checked-out successfully!`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ active: true });
    },
  });

  return { isLoading, checkout: mutate };
}
