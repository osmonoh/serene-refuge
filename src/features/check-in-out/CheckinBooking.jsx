import { useEffect, useState } from "react";
import styled from "styled-components";
import { useBooking } from "../bookings/useBooking";
import { useMoveBack } from "../../hooks/useMoveBack";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import Row from "../../ui/layout/Row";
import Heading from "../../ui/layout/Heading";
import ButtonGroup from "../../ui/layout/ButtonGroup";
import Button from "../../ui/interactive/Button";
import ButtonText from "../../styles/ButtonText";
import Checkbox from "../../ui/interactive/Checkbox";
import Spinner from "../../ui/layout/Spinner";

const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

const CheckinBooking = () => {
    const [confirmPaid, setConfirmPaid] = useState(false);
    const [addBreakfast, setAddBreakfast] = useState(false);

    const { booking, isLoading: isLoadingBooking } = useBooking();
    const { settings, isLoading: isLoadingSettings } = useSettings();

    useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

    const moveBack = useMoveBack();
    const { mutate: checkin, isPending: isCheckingIn } = useCheckin();

    if (isLoadingBooking || isLoadingSettings) return <Spinner />;

    const {
        id: bookingId,
        guests,
        totalPrice,
        numGuests,
        hasBreakfast,
        numNights
    } = booking;

    const optionalBreakfastPrice =
        settings?.breakfastPrice * numNights * numGuests;

    function handleCheckin() {
        if (!confirmPaid) return;

        if (addBreakfast) {
            checkin({
                bookingId,
                breakfast: {
                    hasBreakfast: true,
                    extrasPrice: optionalBreakfastPrice,
                    totalPrice: totalPrice + optionalBreakfastPrice
                }
            });
        } else {
            checkin({ bookingId });
        }
    }

    const handleAddBreakfastChange = () => {
        setAddBreakfast((add) => !add);
        setConfirmPaid(false);
    };

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Check in booking #{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            {!hasBreakfast && (
                <Box>
                    <Checkbox
                        id="breakfast"
                        checked={addBreakfast}
                        onChange={handleAddBreakfastChange}
                        // disabled={addBreakfast || isCheckingIn}
                    >
                        Add breakfast for{" "}
                        {formatCurrency(optionalBreakfastPrice)}
                    </Checkbox>
                </Box>
            )}

            <Box>
                <Checkbox
                    id="confirm"
                    checked={confirmPaid}
                    onChange={() => setConfirmPaid((confirm) => !confirm)}
                    disabled={confirmPaid || isCheckingIn}
                >
                    I confirm that {guests.fullName} has paid the total amount
                    of{" "}
                    {!addBreakfast
                        ? formatCurrency(totalPrice)
                        : `${formatCurrency(
                              totalPrice + optionalBreakfastPrice
                          )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                              optionalBreakfastPrice
                          )})`}
                </Checkbox>
            </Box>

            <ButtonGroup>
                <Button
                    onClick={handleCheckin}
                    disabled={!confirmPaid || isCheckingIn}
                >
                    Check in booking #{bookingId}
                </Button>
                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
};

export default CheckinBooking;
