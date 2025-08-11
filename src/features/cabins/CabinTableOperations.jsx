import TableOperations from "../../styles/TableOperations";
import Filter from "../../ui/interactive/Filter";
import Sort from "../../ui/interactive/Sort";

const CabinTableOperations = () => {
    const filterOptions = [
        { value: "all", label: "All cabins" },
        { value: "without", label: "No discount" },
        { value: "with", label: "With discount" }
    ];

    const sortOptions = [
        { value: "name-asc", label: "Sort by name (A-Z)" },
        { value: "name-desc", label: "Sort by name (Z-A)" },
        { value: "regularPrice-asc", label: "Sort by price (low first)" },
        { value: "regularPrice-desc", label: "Sort by price (high first)" },
        { value: "maxCapacity-asc", label: "Sort by capacity (low first)" },
        { value: "maxCapacity-desc", label: "Sort by capacity (high first)" }
    ];

    return (
        <TableOperations>
            <Filter filterField="discount" options={filterOptions} />

            <Sort options={sortOptions} />
        </TableOperations>
    );
};

export default CabinTableOperations;
