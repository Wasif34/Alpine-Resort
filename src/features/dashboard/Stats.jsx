import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";

function Stats({ bookings, confirmedStays, numDays, roomCount }) {
  const numBookings = bookings?.length;
  const numStays = confirmedStays?.length;

  const sales = bookings?.reduce((acc, cur) => acc + cur.total_Price, 0);

  const checkIns = confirmedStays.length;

  console.log("CONFIRM", confirmedStays, numDays, roomCount);

  const occupancyRate =
    confirmedStays.reduce((acc, cur) => acc + cur.num_nights, 0) /
    (numDays * roomCount);

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="Bookings"
        value={numBookings}
        color="blue"
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title="Sales"
        value={`PKR ${sales}`}
        color="green"
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title="Checked in"
        color="indigo"
        value={checkIns}
      />
      <Stat
        color="yellow"
        icon={<HiOutlineChartBar />}
        title="Occupancy Rate"
        value={`${(occupancyRate * 100).toFixed(2)} %`}
      />
    </>
  );
}

export default Stats;
