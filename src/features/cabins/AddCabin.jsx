import CreateUpdateCabinForm from "./CreateUpdateCabinForm";
import Modal from "../../ui/layout/Modal";
import Button from "../../ui/interactive/Button";

const AddCabin = () => {
    return (
        <div>
            <Modal>
                <Modal.Open opens="cabin-form">
                    <Button>Add new cabin</Button>
                </Modal.Open>
                <Modal.Window name="cabin-form">
                    <CreateUpdateCabinForm />
                </Modal.Window>
            </Modal>
        </div>
    );
};

export default AddCabin;
