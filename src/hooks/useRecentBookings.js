import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../services/apiBookings";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("filter")
    ? 7
    : parseInt(searchParams.get("filter"));

  console.log("Numdays", numDays);

  const queryDate = subDays(new Date(), numDays).toISOString();

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", `last-${numDays} days`],
    queryFn: () => getBookingsAfterDate(queryDate),
  });

  return { bookings, isLoading, error };
}
