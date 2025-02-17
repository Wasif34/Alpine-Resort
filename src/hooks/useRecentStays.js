import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../services/apiBookings";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
export function useRecentStays() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("filter")
    ? 7
    : parseInt(searchParams.get("filter"));

  const queryDate = subDays(new Date(), numDays).toISOString();

  const {
    isLoading,
    data: stays,
    error,
  } = useQuery({
    queryKey: ["stays", `last-${numDays} days`],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  const conFirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return { conFirmedStays, isLoading, error, numDays };
}
