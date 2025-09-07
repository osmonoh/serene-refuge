import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";

export const useBooking = () => {
    const { bookingId } = useParams();

    const {
        isLoading,
        data: booking,
        error
    } = useQuery({
        queryKey: ["booking", bookingId],
        queryFn: () => getBooking(bookingId), // queryFn needs to return a promise
        retry: false // let's define this just for fun :D - react query tries to refetch data three times in case it fails but here it doesn't make much sense
    });

    return { isLoading, error, booking };
};
