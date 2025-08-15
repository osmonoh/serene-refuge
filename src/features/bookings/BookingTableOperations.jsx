import Sort from "../../ui/interactive/Sort";
import Filter from "../../ui/interactive/Filter";
import TableOperations from "../../styles/TableOperations";

const BookingTableOperations = () => {
    return (
        <TableOperations>
            <Filter
                filterField="status"
                options={[
                    { value: "all", label: "All" },
                    { value: "checked-out", label: "Checked out" },
                    { value: "checked-in", label: "Checked in" },
                    { value: "unconfirmed", label: "Unconfirmed" }
                ]}
            />

            <Sort
                options={[
                    {
                        value: "startDate-desc",
                        label: "Sort by date (recent first)"
                    },
                    {
                        value: "startDate-asc",
                        label: "Sort by date (earlier first)"
                    },
                    {
                        value: "totalPrice-desc",
                        label: "Sort by amount (high first)"
                    },
                    {
                        value: "totalPrice-asc",
                        label: "Sort by amount (low first)"
                    }
                ]}
            />
        </TableOperations>
    );
};

export default BookingTableOperations;
