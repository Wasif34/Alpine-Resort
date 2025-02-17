import styled from "styled-components";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import { useTodayActivity } from "../../hooks/useTodayActivity";
import CheckInBooking from "./CheckinBooking";
import TodayItem from "./TodayItem";

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
  overflow-y: auto;

  /* Custom Scrollbar (Chrome, Edge, Safari) */
  &::-webkit-scrollbar {
    width: 8px;
    background-color: var(--color-grey-100);
  }

  &::-webkit-scrollbar-track {
    background: var(--color-grey-100) !important;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: yellow !important;
    border-radius: 10px;
    border: none !important;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: gold !important;
  }

  /* Ensure scrollbar visibility */
  scrollbar-color: var(--color-brand-200) var(--color-grey-100);
  scrollbar-width: thin;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;
  padding: 3.2rem;
  padding-top: 1.6rem;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function Today() {
  const { isLoading, todayActivity } = useTodayActivity();

  return (
    <>
      <StyledToday>
        <Row type="horizontal">
          <Heading as="h2" style={{ paddingLeft: "3.2rem" }}>
            Today's Activities
          </Heading>
        </Row>
        {!isLoading ? (
          todayActivity.length > 0 ? (
            <TodayList>
              {todayActivity.map((booking) => (
                <TodayItem key={booking.id} booking={booking} />
              ))}
            </TodayList>
          ) : (
            <NoActivity>No activity today</NoActivity>
          )
        ) : (
          <p>Loading...</p>
        )}
      </StyledToday>
    </>
  );
}

export default Today;
