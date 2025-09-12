import { useState } from "react";
import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";
import Button from "../../ui/interactive/Button";
import FileInput from "../../ui/form/FileInput";
import Form from "../../ui/form/Form";
import FormRow from "../../ui/form/FormRow";
import Input from "../../ui/form/Input";

const UpdateUserDataForm = () => {
    // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
    const {
        user: {
            email,
            user_metadata: { fullName: currentFullName }
        }
    } = useUser();

    const { isPending: isUpdating, mutate: updateUser } = useUpdateUser();

    const [fullName, setFullName] = useState(currentFullName);
    const [avatar, setAvatar] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!fullName) return;
        console.log(avatar);
        updateUser(
            { fullName, avatar },
            {
                onSuccess: () => {
                    setAvatar(null);
                    e.target.reset();
                }
            }
        );
    };

    const handleCancel = () => {
        setFullName(currentFullName);
        setAvatar(null);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormRow label="Email address">
                <Input value={email} disabled />
            </FormRow>
            <FormRow label="Full name">
                <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    id="fullName"
                    disabled={isUpdating}
                />
            </FormRow>
            <FormRow label="Avatar image">
                <FileInput
                    id="avatar"
                    accept="image/*"
                    onChange={(e) => setAvatar(e.target.files[0])}
                />
            </FormRow>
            <FormRow>
                <Button
                    type="reset"
                    variation="secondary"
                    disabled={isUpdating}
                    onClick={handleCancel}
                >
                    Cancel
                </Button>
                <Button disabled={isUpdating}>Update account</Button>
            </FormRow>
        </Form>
    );
};

export default UpdateUserDataForm;
