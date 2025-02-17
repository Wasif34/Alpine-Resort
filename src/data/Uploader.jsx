import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import supabase from "../services/supabase";
import Button from "../ui/Button";
import { subtractDates } from "../utils/helpers";

import { bookings } from "./data-bookings";
import { rooms } from "./data-cabins";
import { guests } from "./data-guests";

// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxGuestsPerBooking: 10,
//   breakfastPrice: 15,
// };

async function deleteGuests() {
  const { error } = await supabase.from("Guests").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteCabins() {
  const { error } = await supabase.from("Room").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteBookings() {
  const { error } = await supabase.from("Bookings").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function createGuests() {
  const { error } = await supabase.from("Guests").insert(guests);
  if (error) console.log(error.message);
}

async function createCabins() {
  const { error } = await supabase.from("Room").insert(rooms);
  if (error) console.log(error.message);
}

async function createBookings() {
  // Bookings need a guestId and a roomId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all guestIds and roomIds, and then replace the original IDs in the booking data with the actual ones from the DB
  const { data: guestsIds } = await supabase
    .from("Guests")
    .select("id")
    .order("id");

  const allGuestIds = guestsIds.map((room) => room.id);
  const { data: roomsIds } = await supabase
    .from("Room")
    .select("id")
    .order("id");
  const allCabinIds = roomsIds.map((room) => room.id);

  console.log(allGuestIds);
  console.log(allCabinIds);

  const finalBookings = bookings.map((booking) => {
    // Here relying on the order of rooms, as they don't have and ID yet
    const room = rooms.at(booking.roomId - 1);
    const num_nights = subtractDates(booking.end_date, booking.start_date);
    const roomPrice = num_nights * (room.price - room.discount);
    const extra_price = booking.hasBreakfast
      ? num_nights * 15 * booking.num_guests
      : 0; // hardcoded breakfast price
    const total_Price = roomPrice + extra_price;

    let status;
    if (
      isPast(new Date(booking.end_date)) &&
      !isToday(new Date(booking.end_date))
    )
      status = "checked-out";
    if (
      isFuture(new Date(booking.start_date)) ||
      isToday(new Date(booking.start_date))
    )
      status = "unconfirmed";
    if (
      (isFuture(new Date(booking.end_date)) ||
        isToday(new Date(booking.end_date))) &&
      isPast(new Date(booking.start_date)) &&
      !isToday(new Date(booking.start_date))
    )
      status = "checked-in";

    return {
      ...booking,
      num_nights,
      roomPrice,
      extra_price,
      total_Price,
      guestId: allGuestIds.at(booking.guestId - 1),
      roomId: allCabinIds.at(booking.roomId - 1),
      status,
    };
  });

  console.log(finalBookings);

  const { error } = await supabase.from("Bookings").insert(finalBookings);
  if (error) console.log(error.message);
}

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    // Bookings need to be deleted FIRST
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();

    // Bookings need to be created LAST
    await createGuests();
    await createCabins();
    await createBookings();

    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>SAMPLE DATA</h3>

      <Button onClick={uploadAll} disabled={isLoading}>
        Upload all
      </Button>

      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload bookings
      </Button>
    </div>
  );
}

export default Uploader;
