import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useCabins } from "./useCabins";
import Spinner from "../../ui/layout/Spinner";
import Table from "../../ui/layout/Table";
import Menus from "../../ui/interactive/Menus";
import Empty from "../../ui/layout/Empty";
import CabinRow from "./CabinRow";

const CabinTable = () => {
    const { isLoading, cabins } = useCabins();
    const [searchParams] = useSearchParams();

    if (isLoading) return <Spinner />;

    if (!cabins.length) return <Empty resourceName="cabins" />;

    // FILTER
    const filterValue = searchParams.get("discount") || "all";
    let filteredCabins = cabins;

    if (filterValue === "without") {
        filteredCabins = cabins.filter((cabin) => !cabin.discount);
    }
    if (filterValue === "with") {
        filteredCabins = cabins.filter((cabin) => cabin.discount);
    }

    // SORT
    const sortValue = searchParams.get("sort") || "startDate-asc";
    const [field, direction] = sortValue.split("-");
    const modifier = direction === "asc" ? 1 : -1;
    const sortedCabins = filteredCabins.sort(
        (a, b) => (a[field] - b[field]) * modifier
    );

    return (
        <Menus>
            <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
                <Table.Header role="row">
                    <div></div>
                    <div>Cabin</div>
                    <div>Capacity</div>
                    <div>Price</div>
                    <div>Discount</div>
                    <div></div>
                </Table.Header>

                <Table.Body
                    data={sortedCabins}
                    render={(cabin) => (
                        <CabinRow key={cabin.id} cabin={cabin} />
                    )}
                />
            </Table>
        </Menus>
    );
};

export default CabinTable;
