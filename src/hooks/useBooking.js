import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../services/apiBookings";
import { useParams } from "react-router-dom";
export function useBooking() {
  const { bookingId } = useParams();

  const {
    isLoading,
    data: booking,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["booking"],
    queryFn: () => getBooking(bookingId),
    retry: false,
    refetchOnWindowFocus: false,
  });

  return { booking, isLoading, error, isFetching };
}
