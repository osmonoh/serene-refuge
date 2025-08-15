import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

export const useBookings = () => {
    const [searchParams] = useSearchParams();

    // FILTER
    const filterValue = searchParams.get("status");
    const filter =
        !filterValue || filterValue === "all"
            ? null
            : { field: "status", value: filterValue, method: "eq" };

    // SORT
    const sortValue = searchParams.get("sort") || "startDate-asc";
    console.log(sortValue);
    const [field, direction] = sortValue.split("-");
    const sortBy = { field, direction };

    const {
        isLoading,
        data: bookings,
        error
    } = useQuery({
        queryKey: ["bookings", filter, sortBy],
        queryFn: () => getBookings({ filter, sortBy })
    });

    return { isLoading, bookings, error };
};
