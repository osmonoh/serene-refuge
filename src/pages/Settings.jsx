import Row from "../ui/layout/Row";
import Heading from "../ui/layout/Heading";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";

const Settings = () => {
    return (
        <Row>
            <Heading as="h1">Update hotel settings</Heading>
            <UpdateSettingsForm />
        </Row>
    );
};

export default Settings;
