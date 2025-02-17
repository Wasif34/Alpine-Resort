import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getBookings({ page, filter }) {
  console.log("filter", filter);
  if (filter !== null) {
    const { data, error, count } = await supabase
      .from("Bookings")
      .select(
        "id, created_at, start_date, total_Price, end_date, num_nights, num_guests, status, Guests(email, name), Room(name)",
        { count: "exact" }
      )
      .eq(filter.field, filter.value);

    if (error) {
      console.error(error);
      throw new Error("Bookings could not be loaded");
    }
    console.log(data);
    return { data, count };
  }
  const { data, error, count } = await supabase
    .from("Bookings")
    .select(
      "id, created_at, start_date, total_Price, end_date, num_nights, num_guests, status, Guests(email, name), Room(name)",
      { count: "exact" }
    );

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  if (page) {
    const from = (page - 1) * 10;
    const to = from + 10;
    return { data: data.slice(from, to), count };
  }
  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("Bookings")
    .select("*, Room(*), Guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

export async function getRoomBooking(id) {
  const { data, error } = await supabase
    .from("Bookings")
    .select("*, Room(*), Guests(*)")
    .eq("roomId", id);

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("Bookings")
    .select("created_at, total_Price, extra_price")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("Bookings")
    // .select('*')
    .select("*, Guests(name)")
    .gte("start_date", date)
    .lte("start_date", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("Bookings")
    .select("*, Guests(name, ID_Card, country_flag)")
    .or(
      `and(status.eq.unconfirmed,start_date.eq.${getToday()}),and(status.eq.checked-in,end_date.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("Bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  console.log(data);
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("Bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
