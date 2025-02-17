import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const filterValue = searchParams.get("filter") || "all";

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  const page = !searchParams.get("page")
    ? 1
    : parseInt(searchParams.get("page"));

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", page, filter],
    queryFn: () => getBookings({ page, filter }),
  });

  const pageCount = Math.ceil(count / 10);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", page + 1],
      queryFn: () => getBookings({ page: page + 1 }),
    });
  }

  return { bookings, isLoading, error, count };
}
