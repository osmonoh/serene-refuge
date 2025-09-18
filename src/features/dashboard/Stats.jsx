import {
    HiOutlineBanknotes,
    HiOutlineBriefcase,
    HiOutlineCalendarDays,
    HiOutlineChartBar
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";

const Stats = ({ bookings, confirmedStays, numDays, cabinCount }) => {
    const numBookings = bookings.length;
    const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
    const checkins = confirmedStays.length;
    // occupancy - number of checked in nights divided by all available nights (number of days * number of cabins)
    const occupancy = Math.round(
        (confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
            (numDays * cabinCount)) *
            100
    );

    return (
        <>
            <Stat
                title="Bookings"
                color="blue"
                icon={<HiOutlineBriefcase />}
                value={numBookings}
            />
            <Stat
                title="Sales"
                color="green"
                icon={<HiOutlineBanknotes />}
                value={formatCurrency(sales)}
            />
            <Stat
                title="Check ins"
                color="indigo"
                icon={<HiOutlineCalendarDays />}
                value={checkins}
            />
            <Stat
                title="Occupancy rate"
                color="yellow"
                icon={<HiOutlineChartBar />}
                value={`${occupancy}%`}
            />
        </>
    );
};

export default Stats;
