import supabase from "./supabase";

export const getBookings = async ({ filter, sortBy }) => {
    let query = supabase
        .from("bookings")
        .select(
            "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)"
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

    const { data, error } = await query;

    if (error) {
        console.error(error);
        throw new Error("Bookings could not be loaded");
    }

    return data;
};
