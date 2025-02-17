import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useBookings } from "../../hooks/useBookings";
import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { bookings, isLoading, error, count } = useBookings();
  const [searchParams] = useSearchParams();

  console.log("The bookings are as", bookings);
  const filterValue = searchParams.get("filter") || "all";

  let filteredBookings;

  if (filterValue === "all") filteredBookings = bookings;
  if (filterValue === "checked-in")
    filteredBookings = bookings?.filter(
      (booking) => booking.status === "checked-in"
    );
  if (filterValue === "checked-out")
    filteredBookings = bookings?.filter(
      (booking) => booking.status === "checked-out"
    );

  if (filterValue === "unconfirmed")
    filteredBookings = bookings?.filter(
      (booking) => booking.status === "unconfirmed"
    );

  const sortBy = searchParams.get("sortBy") || "total_Price-desc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedBookings = filteredBookings?.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  if (isLoading) return <Spinner />;

  if (error) throw new Error(error.message);

  return (
    <Menus>
      <Table columns="2fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Room</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedBookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
