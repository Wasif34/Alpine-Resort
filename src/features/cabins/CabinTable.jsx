import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getRooms } from "../../services/apiRooms";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useRooms } from "../../hooks/useRooms";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

function CabinTable() {
  const { isLoading, error, rooms } = useRooms();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("filter") || "all";

  console.log(filterValue);

  let filteredRooms;

  if (filterValue === "all") filteredRooms = rooms;
  if (filterValue === "no-discount")
    filteredRooms = rooms.filter((room) => room.discount === 0);
  if (filterValue === "discount")
    filteredRooms = rooms.filter((room) => room.discount > 0);

  const sortBy = searchParams.get("sortBy") || "price-desc";

  const [field, direction] = sortBy.split("-");

  console.log(field, direction);

  const sortedRooms = filteredRooms?.sort(sortFn);

  console.log(sortedRooms);

  function sortFn(a, b) {
    if (direction === "asc") return a[field] > b[field] ? 1 : -1;
    if (direction === "desc") return a[field] < b[field] ? 1 : -1;
  }

  if (error) {
    console.error(error);
    throw new Error("Rooms could not be loaded");
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Room</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedRooms}
          render={(room) => <CabinRow room={room} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
