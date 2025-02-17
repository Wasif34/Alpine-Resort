import { useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../services/apiBookings";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation({
    mutationFn: ({ bookingId, breakfast }) => {
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      });
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success(`Checked-in successfully!`);
      queryClient.invalidateQueries({ active: true });
      navigate("/bookings");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isLoading, checkin: mutate };
}
