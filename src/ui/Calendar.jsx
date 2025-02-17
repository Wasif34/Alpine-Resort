import { useState, useEffect } from "react";
import styled from "styled-components";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const CalendarContainer = styled.div`
  width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background: var(--color-grey-0);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--color-grey-200);
  border-radius: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const MonthTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.75rem;
  text-align: center;
  font-size: 1.25rem;
`;

const Day = styled.div`
  padding: 0.5rem;
  border-radius: 8px;
  background: ${(props) =>
    props.isBooked ? "var(--color-brand-400)" : "#E5E7EB"};
  color: ${(props) => (props.isBooked ? "white" : "black")};
  font-weight: ${(props) => (props.isBooked ? "bold" : "normal")};
`;

const EmptyDay = styled.div`
  background-color: var("--color-grey-200");
`;

const DayLabel = styled.div`
  font-weight: bold;
`;

const parseDate = (dateStr) => {
  const [month, day, year] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
};

// Get all dates between two dates
const getDatesBetween = (startDate, endDate) => {
  const dates = [];
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};

const Calendar = ({ startDate, endDate }) => {
  const [bookedDates, setBookedDates] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(0);
  const [currentYear, setCurrentYear] = useState(0);

  useEffect(() => {
    const start = parseDate(startDate);
    const end = parseDate(endDate);

    if (isNaN(start) || isNaN(end)) return;

    const dates = getDatesBetween(start, end);
    setBookedDates(dates);

    setCurrentMonth(dates[0].getMonth());
    setCurrentYear(dates[0].getFullYear());
  }, [startDate, endDate]);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDay = new Date(currentYear, currentMonth, 1).getDay();

  const nextMonth = () => {
    const next = new Date(currentYear, currentMonth + 1, 1);
    const lastBooked = bookedDates[bookedDates.length - 1];
    if (next <= lastBooked) {
      setCurrentMonth(next.getMonth());
      setCurrentYear(next.getFullYear());
    }
  };

  const prevMonth = () => {
    const prev = new Date(currentYear, currentMonth - 1, 1);
    const firstBooked = bookedDates[0];
    if (
      prev >= new Date(firstBooked.getFullYear(), firstBooked.getMonth(), 1)
    ) {
      setCurrentMonth(prev.getMonth());
      setCurrentYear(prev.getFullYear());
    }
  };

  const isBooked = (day) =>
    bookedDates.some(
      (date) =>
        date.getFullYear() === currentYear &&
        date.getMonth() === currentMonth &&
        date.getDate() === day
    );

  const generateDays = () => {
    const days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(<EmptyDay key={`empty-${i}`} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <Day key={day} isBooked={isBooked(day)}>
          {day}
        </Day>
      );
    }

    return days;
  };

  return (
    <CalendarContainer>
      <Header>
        <FaChevronLeft cursor={"pointer"} onClick={prevMonth}>
          &lt;
        </FaChevronLeft>
        <MonthTitle>
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </MonthTitle>
        <FaChevronRight cursor="pointer" onClick={nextMonth}>
          &gt;
        </FaChevronRight>
      </Header>
      <Grid>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <DayLabel key={day}>{day}</DayLabel>
        ))}
        {generateDays()}
      </Grid>
    </CalendarContainer>
  );
};

export default Calendar;
