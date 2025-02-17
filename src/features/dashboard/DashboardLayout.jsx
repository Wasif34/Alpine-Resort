import styled from "styled-components";
import { useRecentBookings } from "../../hooks/useRecentBookings";
import { useRecentStays } from "../../hooks/useRecentStays";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useRooms } from "../../hooks/useRooms";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading, bookings, error } = useRecentBookings();

  const {
    isLoading: staysLoading,
    conFirmedStays,
    error: staysError,
    numDays,
  } = useRecentStays();

  const { rooms, isLoading: roomsLoading } = useRooms();

  if (isLoading || staysLoading || roomsLoading) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={conFirmedStays}
        numDays={numDays}
        roomCount={rooms.length}
      />

      <TodayActivity />
      <DurationChart confirmedStays={conFirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
