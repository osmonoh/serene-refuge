import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useLogout } from "./useLogout";
import ButtonIcon from "../../ui/interactive/ButtonIcon";
import SpinnerMini from "../../ui/layout/SpinnerMini";

const Lougout = () => {
    const { isPending: isLoggingOut, mutate: logout } = useLogout();

    return (
        <ButtonIcon onClick={logout} disabled={isLoggingOut}>
            {isLoggingOut ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
        </ButtonIcon>
    );
};

export default Lougout;
