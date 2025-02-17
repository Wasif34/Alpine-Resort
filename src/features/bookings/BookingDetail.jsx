import styled from "styled-components";
import { useState } from "react";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../../hooks/useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useCheckOut } from "../../hooks/useCheckout";
import ConfirmDelete from "../../ui/ConfirmDelete";

import { useDeleteBooking } from "../../hooks/useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading, error, isFetching } = useBooking();
  const { isLoading: isCheckingOut, checkout } = useCheckOut();

  const [isDelete, setIsDelete] = useState(false);

  const { deleteBooking, isLoading: isDeleting } = useDeleteBooking();

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isFetching || isLoading || isCheckingOut) return <Spinner />;

  const { status, guests, numNights, totalPrice, id } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking {id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button
            variation="danger"
            onClick={() => {
              setIsDelete(true);
            }}
          >
            Cancel booking #{id}
          </Button>
        )}
        {isDelete && (
          <ConfirmDelete
            resourceName="booking"
            onConfirm={() => deleteBooking(id)}
            onClose={() => setIsDelete(false)}
            loading={isDeleting}
          />
        )}
        {status === "unconfirmed" && booking.isPaid && (
          <Button
            variation="primary"
            onClick={() => navigate(`/checkin/${id}`)}
          >
            Check-In
          </Button>
        )}
        {status === "checked-in" && (
          <Button variation="primary" onClick={() => checkout(id)}>
            Check-Out
          </Button>
        )}
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
