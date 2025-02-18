import styled from "styled-components";
import Tag from "../../ui/Tag";
import { TbAirConditioning } from "react-icons/tb";
import { FaWifi, FaTv } from "react-icons/fa6";
import { BiFridge } from "react-icons/bi";
import { MdCleaningServices, MdBedroomChild } from "react-icons/md";
import { HiArrowSmallDown, HiOutlineCurrencyDollar } from "react-icons/hi2";
import Button from "../../ui/Button";
import { useQuery } from "@tanstack/react-query";
import { getRoomBooking } from "../../services/apiBookings";
import { useState } from "react";
import BookingRoomRow from "../bookings/BookingRoomRow";
import Table from "../../ui/Table";
import { set } from "date-fns";

const Image = styled.img`
  max-width: 75%;
  border-radius: var(--border-radius-tiny);
  display: block;
  border: 1px solid var(--color-grey-100);
`;

const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
`;

const Description = styled.p`
  color: var(--color-grey-600);
  line-height: 1.6;
`;

const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FeatureContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const PriceContainer = styled.p`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  font-size: 1.2rem;
`;

const ScrollContainer = styled.div`
  /* height: 600px; /* Fixed height for vertical scrolling */
  /* overflow-y: auto; Enables vertical scrolling */ */
  /* Prevents scrollbar overlap */
  /* Optional: Adds a border */
`;

function ViewRoom({ room }) {
  const [fetchBooking, setFetchBooking] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    data: roomBooking,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["rbooking"],
    queryFn: () => getRoomBooking(room.id),
    enabled: false, // Prevents automatic fetching
  });

  function handleBooking() {
    if (fetchBooking) {
      setFetchBooking(false);
      return;
    }
    setLoading(true);
    setFetchBooking(true);
    refetch().then(() => {
      setLoading(false);
    }); // Manually triggers fetching
  }
  const features = [
    {
      icon: <TbAirConditioning size={14} />,
      label: "Air Conditioned",
      type: "blue",
    },
    { icon: <FaWifi size={14} />, label: "Hi-Speed Wifi", type: "green" },
    { icon: <FaTv size={14} />, label: "Smart TV", type: "red" },
    { icon: <BiFridge size={14} />, label: "Mini-Fridge", type: "yellow" },
    {
      icon: <MdCleaningServices size={14} />,
      label: "24/7 Room Service",
      type: "grey",
    },
  ];

  return (
    <ScrollContainer>
      <ImageBox>
        <Image src={room.imageUrl} alt={room.name} />
      </ImageBox>
      <FlexDiv>
        <h1>{room.name}</h1>
        <Description>{room.description}</Description>

        <FeatureContainer>
          {features.map((feature, index) => (
            <Tag
              key={index}
              type={feature.type}
              style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}
            >
              {feature.icon} {feature.label}
            </Tag>
          ))}
        </FeatureContainer>

        <PriceContainer>
          <HiOutlineCurrencyDollar size={30} /> PKR {room.price} /
          <span style={{ color: "var(--color-grey-600)", fontSize: "1rem" }}>
            {" "}
            per night
          </span>
        </PriceContainer>

        <PriceContainer>
          <MdBedroomChild size={30} /> {room.maxCapacity} Guests
        </PriceContainer>
        <Button
          variation="primary"
          style={{
            width: "30%",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
          onClick={handleBooking}
        >
          <HiArrowSmallDown />
          <span>{loading ? "Loading..." : "View Bookings"}</span>
        </Button>
        {fetchBooking && !loading && (
          <Table columns="2fr 1.4fr 1fr 1fr">
            <Table.Header>
              <div>Guest</div>
              <div>Dates</div>
              <div>Status</div>
              <div>Amount</div>
              <div></div>
            </Table.Header>

            <Table.Body
              data={roomBooking}
              render={(booking) => (
                <BookingRoomRow key={booking.id} booking={booking} />
              )}
            />
          </Table>
        )}
      </FlexDiv>
    </ScrollContainer>
  );
}

export default ViewRoom;
