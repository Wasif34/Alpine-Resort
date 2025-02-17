import { useQueryClient } from "@tanstack/react-query";
import { getRoomBooking } from "../services/apiBookings";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

export function useRoomBooking(id) {
  const {
    isLoading,
    data: roomBooking,
    error,
  } = useQuery({
    queryKey: ["rbooking"],
    queryFn: () => getRoomBooking(id),
    retry: false,
  });

  return { roomBooking, isLoading, error };
}
