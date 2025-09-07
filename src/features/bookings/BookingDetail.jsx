import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/layout/Row";
import Heading from "../../ui/layout/Heading";
import Tag from "../../styles/Tag";
import ButtonGroup from "../../ui/layout/ButtonGroup";
import Button from "../../ui/interactive/Button";
import Spinner from "../../ui/layout/Spinner";
import ButtonText from "../../styles/ButtonText";
import Modal from "../../ui/layout/Modal";
import ConfirmDelete from "../../ui/interactive/ConfirmDelete";

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

function BookingDetail() {
    const { booking, isLoading } = useBooking();
    const { mutate: checkout, isPending: isCheckingOut } = useCheckout();
    const { isPending: isDeleting, mutate: deleteBooking } = useDeleteBooking();

    const navigate = useNavigate();
    const moveBack = useMoveBack();

    if (isLoading) return <Spinner />;

    const { status, id: bookingId } = booking;

    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver"
    };

    const handleDeleteBooking = () => {
        deleteBooking(bookingId, {
            onSettled: () => moveBack()
        });
    };

    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">Booking #{bookingId}</Heading>
                    <Tag type={statusToTagName[status]}>
                        {status.replace("-", " ")}
                    </Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <ButtonGroup>
                {status === "unconfirmed" && (
                    <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
                        Check in
                    </Button>
                )}

                {status === "checked-in" && (
                    <Button
                        onClick={() => checkout(bookingId)}
                        disabled={isCheckingOut}
                    >
                        Check out
                    </Button>
                )}

                <Modal>
                    <Modal.Open opens="delete">
                        <Button variation="danger">Delete</Button>
                    </Modal.Open>

                    <Modal.Window name="delete">
                        <ConfirmDelete
                            resourceName="booking"
                            onConfirm={handleDeleteBooking}
                            disabled={isDeleting}
                        />
                    </Modal.Window>
                </Modal>

                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default BookingDetail;
