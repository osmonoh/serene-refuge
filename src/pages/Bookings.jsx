import Heading from "../ui/layout/Heading";
import Row from "../ui/layout/Row";
import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";

const Bookings = () => {
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All bookings</Heading>
                <BookingTableOperations />
            </Row>

            <BookingTable />
        </>
    );
};

export default Bookings;
