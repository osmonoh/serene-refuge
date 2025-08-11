import { useBookings } from "./useBookings";
import Table from "../../ui/layout/Table";
import Menus from "../../ui/interactive/Menus";
import Empty from "../../ui/layout/Empty";
import Spinner from "../../ui/layout/Spinner";
import BookingRow from "./BookingRow";

const BookingTable = () => {
    const { isLoading, bookings } = useBookings();

    if (isLoading) return <Spinner />;

    if (!bookings.length) return <Empty resourceName="bookings" />;

    return (
        <Menus>
            <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
                <Table.Header>
                    <div>Cabin</div>
                    <div>Guest</div>
                    <div>Dates</div>
                    <div>Status</div>
                    <div>Amount</div>
                    <div></div>
                </Table.Header>

                <Table.Body
                    data={bookings}
                    render={(booking) => (
                        <BookingRow key={booking.id} booking={booking} />
                    )}
                />
            </Table>
        </Menus>
    );
};

export default BookingTable;
