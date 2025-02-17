import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useEffect, useState } from "react";
import { useMoveBack } from "../../hooks/useMoveBack";
import Checkbox from "../../ui/Checkbox";
import { useBooking } from "../../hooks/useBooking";
import Spinner from "../../ui/Spinner";
import { useCheckin } from "../../hooks/useCheckin";
import { set } from "date-fns";
import { useSettings } from "../../hooks/useSettings";
import Switch from "../../ui/Switch";
const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [InitialbreakfastIncluded, setInitialbreakfastIncluded] =
    useState(false);
  const [toPayPrice, setToPayPrice] = useState(false);
  const [breakfastIncluded, setbreakfastIncluded] = useState(false);
  const [price, setPrice] = useState(0);

  const { booking, isFetching } = useBooking();

  const { isLoading, checkin } = useCheckin();

  const { settings, isLoading: isLoadingSettings } = useSettings();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid);
    setInitialbreakfastIncluded(booking?.hasBreakfast);
  }, [booking]);

  if (isFetching || isLoadingSettings) return <Spinner />;

  let {
    id: bookingId,
    Guests,
    total_Price,
    num_guests,
    hasBreakfast,
    num_nights,
  } = booking;

  const optionalBreakfastPrice =
    settings?.breakfast_price * num_guests * num_nights;

  console.log("Optional", optionalBreakfastPrice);

  function handleBreakfast() {
    setbreakfastIncluded(!breakfastIncluded);
    if (booking?.isPaid) {
      setPrice(() => optionalBreakfastPrice);
      setConfirmPaid(false);
      setToPayPrice(true);
    } else {
      setPrice(() => optionalBreakfastPrice + total_Price);

      setToPayPrice(true);
    }
  }

  function handleCheckin() {
    if (breakfastIncluded) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extra_price: optionalBreakfastPrice,
          total_Price: optionalBreakfastPrice + total_Price,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <BookingDataBox booking={booking} />

      {!InitialbreakfastIncluded && (
        <Box>
          <Switch
            checked={breakfastIncluded}
            onClick={handleBreakfast}
            price={settings?.breakfast_price * num_nights}
          >
            <strong>Breakfast included</strong>
          </Switch>
        </Box>
      )}

      <Box>
        <Checkbox
          value={confirmPaid}
          onChange={() => setConfirmPaid(!confirmPaid)}
          checked={confirmPaid}
          disabled={confirmPaid}
        >
          {confirmPaid && !toPayPrice ? (
            <>
              <strong>Confirmed</strong>
              {booking.Guests.name} has paid the total amount of PKR{" "}
              {total_Price}
            </>
          ) : toPayPrice && confirmPaid ? (
            <>
              <strong>Confirmed</strong>
              {booking.Guests.name} has paid the total amount of PKR {price}
            </>
          ) : toPayPrice && !confirmPaid ? (
            <>
              <strong>Not Confirmed</strong>
              {booking.Guests.name} has not paid the total amount of PKR {price}
            </>
          ) : (
            <>
              <strong>Not Confirmed</strong>
              {booking.Guests.name} has not paid the total amount of PKR
              {total_Price}
            </>
          )}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmPaid} onClick={handleCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
