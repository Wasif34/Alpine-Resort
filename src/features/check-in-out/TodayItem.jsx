import styled from "styled-components";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";
import {
  HiChevronDown,
  HiChevronUp,
  HiOutlineChatBubbleBottomCenterText,
} from "react-icons/hi2";
import { useState } from "react";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem 1.2rem;
  gap: 1.2rem;
  align-items: center;
  font-size: 1.4rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

const NotesItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 2rem;
  grid-column: 1 / -1;
`;
const Label = styled.span`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-weight: 500;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-brand-200);
  }
`;

function TodayItem({ booking }) {
  const [isOpen, setIsOpen] = useState(false);
  const { id, status, Guests, num_nights, Notes } = booking;
  return (
    <StyledTodayItem>
      {status === "unconfirmed" ? (
        <Tag type="green">Arriving</Tag>
      ) : (
        <Tag type="blue">Departing</Tag>
      )}

      <Flag src={Guests.country_flag} alt="flag of guest" />
      <Guest>{Guests.name}</Guest>
      <div>{num_nights} nights</div>
      {status === "unconfirmed" && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
      {status === "unconfirmed" && !isOpen ? (
        <HiChevronDown cursor={"pointer"} onClick={() => setIsOpen(true)} />
      ) : (
        isOpen && (
          <HiChevronUp cursor={"pointer"} onClick={() => setIsOpen(false)} />
        )
      )}
      {isOpen && (
        <NotesItem>
          <Label>
            <HiOutlineChatBubbleBottomCenterText />
            <span>Notes</span>
          </Label>
          <p>{Notes}</p>
        </NotesItem>
      )}
    </StyledTodayItem>
  );
}

export default TodayItem;
