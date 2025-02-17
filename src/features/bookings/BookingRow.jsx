import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import { useState } from "react";
import { useDeleteBooking } from "../../hooks/useDeleteBooking";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { redirect, useNavigate } from "react-router-dom";

import { formatDistanceFromNow } from "../../utils/helpers";
import { useCheckOut } from "../../hooks/useCheckout";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    start_date,
    end_date,
    num_nights,
    num_guests,
    total_Price,
    status,
    Guests: { name: guestName, email },
    Room: { name: roomName },
  },
}) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const { isLoading, checkout } = useCheckOut();
  const { deleteBooking, isLoading: isDeleting } = useDeleteBooking();

  const [deleteButton, setDeleteButton] = useState(false);
  const navigate = useNavigate();

  if (isLoading || isDeleting) {
    return <Spinner />;
  }

  return (
    <Table.Row>
      <Cabin>{roomName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(start_date))
            ? "Today"
            : formatDistanceFromNow(start_date)}{" "}
          &rarr; {num_nights} night stay
        </span>
        <span>
          {format(new Date(start_date), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(end_date), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>PKR {total_Price}</Amount>
      <Menus.Menu>
        <Menus.Toggle id={bookingId} />
        <Menus.List id={bookingId}>
          <Menus.Button
            icon={<HiEye />}
            onClick={() => navigate(`/bookings/${bookingId}`)}
          >
            Details
          </Menus.Button>
          {status === "unconfirmed" && (
            <>
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check-in
              </Menus.Button>
              <Menus.Button
                icon={<HiTrash />}
                onClick={() => setDeleteButton(true)}
              >
                Delete Booking
              </Menus.Button>
            </>
          )}
          {deleteButton && (
            <ConfirmDelete
              resourceName="booking"
              onClose={() => setDeleteButton(false)}
              onConfirm={() => deleteBooking(bookingId)}
              loading={isDeleting}
            />
          )}

          {status === "checked-in" && (
            <Menus.Button
              icon={<HiArrowUpOnSquare />}
              onClick={() => checkout(bookingId)}
            >
              Check-out
            </Menus.Button>
          )}
        </Menus.List>
      </Menus.Menu>
    </Table.Row>
  );
}

export default BookingRow;
