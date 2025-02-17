import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import useLocalStorageState from "../../hooks/useLocalStorageState";
import { useDarkMode } from "../../context/DarkModeContext";
import { format, isSameDay, subDays } from "date-fns";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import Heading from "../../ui/Heading";
import { eachDayOfInterval } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

const fakeData = [
  { label: "Jan 09", totalSales: 480, extrasSales: 20 },
  { label: "Jan 10", totalSales: 580, extrasSales: 100 },
  { label: "Jan 11", totalSales: 550, extrasSales: 150 },
  { label: "Jan 12", totalSales: 600, extrasSales: 50 },
  { label: "Jan 13", totalSales: 700, extrasSales: 150 },
  { label: "Jan 14", totalSales: 800, extrasSales: 150 },
  { label: "Jan 15", totalSales: 700, extrasSales: 200 },
  { label: "Jan 16", totalSales: 650, extrasSales: 200 },
  { label: "Jan 17", totalSales: 600, extrasSales: 300 },
  { label: "Jan 18", totalSales: 550, extrasSales: 100 },
  { label: "Jan 19", totalSales: 700, extrasSales: 100 },
  { label: "Jan 20", totalSales: 800, extrasSales: 200 },
  { label: "Jan 21", totalSales: 700, extrasSales: 100 },
  { label: "Jan 22", totalSales: 810, extrasSales: 50 },
  { label: "Jan 23", totalSales: 950, extrasSales: 250 },
  { label: "Jan 24", totalSales: 970, extrasSales: 100 },
  { label: "Jan 25", totalSales: 900, extrasSales: 200 },
  { label: "Jan 26", totalSales: 950, extrasSales: 300 },
  { label: "Jan 27", totalSales: 850, extrasSales: 200 },
  { label: "Jan 28", totalSales: 900, extrasSales: 100 },
  { label: "Jan 29", totalSales: 800, extrasSales: 300 },
  { label: "Jan 30", totalSales: 950, extrasSales: 200 },
  { label: "Jan 31", totalSales: 1100, extrasSales: 300 },
  { label: "Feb 01", totalSales: 1200, extrasSales: 400 },
  { label: "Feb 02", totalSales: 1250, extrasSales: 300 },
  { label: "Feb 03", totalSales: 1400, extrasSales: 450 },
  { label: "Feb 04", totalSales: 1500, extrasSales: 500 },
  { label: "Feb 05", totalSales: 1400, extrasSales: 600 },
  { label: "Feb 06", totalSales: 1450, extrasSales: 400 },
];

function SalesChart({ bookings, numDays }) {
  const { isDarkMode } = useDarkMode();

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.total_Price, 0),

      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.extra_price, 0),
    };
  });

  console.log(data);
  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#fcf06a", fill: "#fef26b" },
        extrasSales: { stroke: "#5e9364", fill: "#175116" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {format(allDates[0], "MMM dd")} &mdash;{" "}
        {format(allDates[allDates.length - 1], "MMM dd")}{" "}
      </Heading>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          style={{ padding: "1rem 0" }}
          height={300}
          width={600}
        >
          <XAxis
            dataKey="label"
            tickLine={{ stroke: colors.text }}
            tick={{ fill: colors.text }}
            tickMargin={11}
            fontSize={13}
          />
          <YAxis
            tickLine={{ stroke: colors.text }}
            tick={{ fill: colors.text }}
            tickFormatter={(value) => `PKR ${value}`}
            fontSize={13}
          />
          <CartesianGrid strokeDasharray={""} />

          <Area
            type="monotone"
            dataKey="totalSales"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total sales"
          />

          <Area
            type="monotone"
            dataKey="extrasSales"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Extra sales"
          />
          <Tooltip
            contentStyle={{ backgroundColor: colors.background }}
            formatter={(value, name) => [`PKR ${value}`, name]}
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
