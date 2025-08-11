import Heading from "../ui/layout/Heading";
import Row from "../ui/layout/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

const Cabins = () => {
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All cabins</Heading>
                <CabinTableOperations />
            </Row>

            <Row>
                <CabinTable />
                <AddCabin />
            </Row>
        </>
    );
};

export default Cabins;
