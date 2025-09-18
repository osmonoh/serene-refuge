import DashboardLayout from "../features/dashboard/DashboardLayout";
import DashboardFilter from "../features/dashboard/DashboardFilter";
import Heading from "../ui/layout/Heading";
import Row from "../ui/layout/Row";

const Dashboard = () => {
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Dashboard</Heading>
                <DashboardFilter />
            </Row>

            <DashboardLayout />
        </>
    );
};

export default Dashboard;
