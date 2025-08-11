import Heading from "../ui/layout/Heading";
import Row from "../ui/layout/Row";
import BookingTable from "../features/bookings/BookingTable";

const Bookings = () => {
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All bookings</Heading>
                <p>TEST</p>
            </Row>

            <BookingTable />
        </>
    );
}

export default Bookings;
