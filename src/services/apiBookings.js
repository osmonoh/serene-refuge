import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

export const getBookings = async ({ filter, sortBy, page }) => {
    let query = supabase.from("bookings").select(
        "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)",
        { count: "exact" } // we can pass here a second argument to get the number of results and use it instead of calculating it later (which is super easy but lets go with this to see this supabase feature which can be usefull to know), but of course we have to add it to returned data which changes the whole structure a bit
    ); // .select("*, cabins(*), guests(*)");

    // FILTER
    if (filter) {
        // query = query.eq(filter.field, filter.value);
        query = query[filter.method || "eq"](filter.field, filter.value); // making the method dynamic (for example eq, neq, gt, gte, lt, lte. like, ilike, is, in, containes, containedBy, ...)
    }

    // SORT
    if (sortBy) {
        query = query.order(sortBy.field, {
            ascending: sortBy.direction === "asc"
        });
    }

    // PAGINATION
    if (page) {
        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE - 1;

        query = query.range(from, to);
    }

    const { data, error, count } = await query;

    if (error) {
        console.error(error);
        throw new Error("Bookings could not be loaded");
    }

    return { data, count };
};

export const getBooking = async (id) => {
    const { data, error } = await supabase
        .from("bookings")
        .select("*, cabins(*), guests(*)")
        .eq("id", id)
        .single();

    if (error) {
        console.error(error);
        throw new Error("Booking not found");
    }

    return data;
};

export const updateBooking = async (id, obj) => {
    const { data, error } = await supabase
        .from("bookings")
        .update(obj)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.error(error);
        throw new Error("Booking could not be updated");
    }
    return data;
};

export const deleteBooking = async (id) => {
    // REMEMBER RLS POLICIES
    const { data, error } = await supabase
        .from("bookings")
        .delete()
        .eq("id", id);

    if (error) {
        console.error(error);
        throw new Error("Booking could not be deleted");
    }
    return data;
};
