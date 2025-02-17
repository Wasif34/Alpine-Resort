import styled from "styled-components";
import { format, isToday } from "date-fns";
import { getRoom } from "../../services/apiRooms";
import { useQuery } from "@tanstack/react-query";
import Tag from "../../ui/Tag";
import { TbAirConditioning, TbBrandBooking } from "react-icons/tb";
import { FaWifi, FaTv, FaPeopleGroup, FaRegIdCard } from "react-icons/fa6";
import { BiFridge } from "react-icons/bi";
import {
  MdCleaningServices,
  MdBedroomChild,
  MdOutlinePeopleAlt,
  MdEmail,
} from "react-icons/md";
import { MdOutlineReduceCapacity } from "react-icons/md";

import {
  HiOutlineBanknotes,
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";
import { IoFastFoodOutline } from "react-icons/io5";

import DataItem from "../../ui/DataItem";
import { Flag } from "../../ui/Flag";

import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";
import { GrStatusGood } from "react-icons/gr";
import Calendar from "../../ui/Calendar";

const StyledBookingDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-${(props) => props.type});
  padding: 2rem 4rem;
  color: #fff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const statusToTagName = {
  unconfirmed: "blue",
  "checked-in": "green",
  "checked-out": "silver",
};
const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const FeatureContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

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
const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
  color: ${(props) =>
    props.isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

const RoomBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 2rem;
`;

const Text = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
`;

const Img = styled.img`
  border-radius: var(--border-radius-lg);
  width: 20%;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
`;
// A purely presentational component
function BookingDataBox({ booking }) {
  const {
    created_at,
    start_date,
    end_date,
    num_nights,
    num_guests,
    roomPrice,
    extras_price,
    total_Price,
    hasBreakfast,
    Notes,
    isPaid,
    status,
    Guests: { name: guestName, email, country_flag, ID_Card },
    Room: { name: roomName },
  } = booking;

  const { data: roomBooking, isFetching } = useQuery({
    queryKey: ["Room"],
    queryFn: () => getRoom(booking.Room.id),

    // Prevents automatic fetching
  });
  if (isFetching) {
    return <p>Loading...</p>;
  }

  const startDate = format(new Date(start_date), "MM-dd-yyyy");
  const endDate = format(new Date(end_date), "MM-dd-yyyy");

  console.log(startDate, endDate);
  return (
    <StyledBookingDataBox>
      <Header type="brand-400">
        <div>
          <HiOutlineHomeModern />
          <p>Room Details</p>
        </div>

        {/* <p>
          {format(new Date(start_date), "EEE, MMM dd yyyy")} (
          {isToday(new Date(start_date))
            ? "Today"
            : formatDistanceFromNow(start_date)}
          ) &mdash; {format(new Date(end_date), "EEE, MMM dd yyyy")}
        </p> */}
      </Header>

      <RoomBox>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Img src={roomBooking?.imageUrl} alt={roomName} />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Text>
              Room Name: <strong>{roomName}</strong>
            </Text>
            <Text
              style={{
                display: "flex",
                gap: "0.5rem",
                alignItems: "center",
              }}
            >
              Room Price: <strong>{roomPrice}</strong>{" "}
              <span
                style={{ fontSize: "1rem", color: "var(--color-grey-500)" }}
              >
                / Per Night
              </span>
            </Text>
            <Text>
              Max Capacity: <strong>{roomBooking?.maxCapacity}</strong>
            </Text>
          </div>
        </div>
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
      </RoomBox>

      <Header type="brand-300">
        <div>
          <MdOutlinePeopleAlt />
          <p>Guest Details</p>
        </div>
      </Header>

      <Section>
        <Guest>
          {country_flag && (
            <Flag src={country_flag} alt={`Flag of ${guestName}`} />
          )}
          <p>
            {guestName} {num_guests > 1 ? `+ ${num_guests - 1} guests` : ""}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>ID Card: {ID_Card}</p>
        </Guest>

        <DataItem icon={<MdEmail />} label="Email">
          {email}
        </DataItem>
        <DataItem icon={<FaRegIdCard />} label="ID Card">
          {ID_Card}
        </DataItem>
      </Section>

      <Header type="brand-500">
        <div>
          <TbBrandBooking />
          <p>Booking Details</p>
        </div>
        <p>
          {format(new Date(start_date), "EEE, MMM dd yyyy")} (
          {isToday(new Date(start_date))
            ? "Today"
            : formatDistanceFromNow(start_date)}
          ) &mdash; {format(new Date(end_date), "EEE, MMM dd yyyy")}
        </p>
      </Header>

      <Section
        style={{
          display: "flex",
          gap: "30rem",
        }}
      >
        <div>
          {Notes && (
            <DataItem
              icon={<HiOutlineChatBubbleBottomCenterText />}
              label="Notes"
            >
              {Notes}
            </DataItem>
          )}

          <DataItem icon={<FaPeopleGroup />} label="Total Guests">
            {num_guests}
          </DataItem>

          <DataItem icon={<HiOutlineBanknotes />} label="Total Price">
            PKR {total_Price}
          </DataItem>

          <DataItem icon={<IoFastFoodOutline />} label="Breakfast included?">
            {hasBreakfast ? "Yes" : "No"}
          </DataItem>

          <DataItem icon={<GrStatusGood />} label="Booking Status?">
            <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
          </DataItem>
        </div>
        <div>
          <p
            style={{
              textAlign: "center",
              fontSize: "2rem",
              marginBottom: "1rem",
            }}
          >
            Booking Dates
          </p>
          <Calendar startDate={startDate} endDate={endDate} />
        </div>
      </Section>

      <Price isPaid={isPaid}>
        <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
          PKR {total_Price}
          {hasBreakfast && ` (Room +  breakfast)`}
        </DataItem>

        <p>{isPaid ? "Paid" : "Will pay at the spot"}</p>
      </Price>

      <Footer>
        <p>Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</p>
      </Footer>
    </StyledBookingDataBox>
  );
}

export default BookingDataBox;
