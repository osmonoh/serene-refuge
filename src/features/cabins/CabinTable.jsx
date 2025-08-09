import { useCabin } from "./useCabin";
import Spinner from "../../ui/layout/Spinner";
import Table from "../../ui/layout/Table";
import Menus from "../../ui/interactive/Menus";
import Empty from "../../ui/layout/Empty";
import CabinRow from "./CabinRow";

const CabinTable = () => {
    const { isLoading, cabins } = useCabin();

    if (isLoading) return <Spinner />;

    if (!cabins.length) return <Empty resource="cabins" />;

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
                    data={cabins}
                    render={(cabin) => (
                        <CabinRow key={cabin.id} cabin={cabin} />
                    )}
                />
            </Table>
        </Menus>
    );
};

export default CabinTable;
