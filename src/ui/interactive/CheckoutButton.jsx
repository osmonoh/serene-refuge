import Button from "./Button";
import { useCheckout } from "../../features/check-in-out/useCheckout";

const CheckoutButton = ({ bookingId }) => {
    const { isPending: isCheckingOut, mutate: checkout } = useCheckout();

    return (
        <Button
            variation="secondary"
            size="small"
            onClick={() => checkout(bookingId)}
            disabled={isCheckingOut}
        >
            Check out
        </Button>
    );
};

export default CheckoutButton;
