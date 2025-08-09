import { useForm } from "react-hook-form";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";
import Form from "../../ui/form/Form";
import FormRow from "../../ui/form/FormRow";
import Input from "../../ui/form/Input";
import Spinner from "../../ui/layout/Spinner";

const UpdateSettingsForm = () => {
    const { isLoading, error, settings } = useSettings();

    const { isPending: isUpdating, mutate: updateSetting } = useUpdateSetting();

    // Initialize react-hook-form with settings as defaultValues
    // This will automatically update the form when settings change
    const { register } = useForm({
        defaultValues: settings,
        // This ensures the form updates when settings change
        values: settings
    });

    // Handle individual field updates
    const handleUpdate = (e, fieldName) => {
        const { value } = e.target;

        if (!value) return;

        updateSetting({ [fieldName]: value });
    };

    if (isLoading) return <Spinner />;

    return (
        <Form>
            <FormRow label="Minimum nights/booking">
                <Input
                    type="number"
                    id="min-nights"
                    disabled={isUpdating}
                    {...register("minBookingLength")}
                    onBlur={(e) => handleUpdate(e, "minBookingLength")}
                />
            </FormRow>

            <FormRow label="Maximum nights/booking">
                <Input
                    type="number"
                    id="max-nights"
                    disabled={isUpdating}
                    {...register("maxBookingLength")}
                    onBlur={(e) => handleUpdate(e, "maxBookingLength")}
                />
            </FormRow>

            <FormRow label="Maximum guests/booking">
                <Input
                    type="number"
                    id="max-guests"
                    disabled={isUpdating}
                    {...register("maxGuestsPerBooking")}
                    onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
                />
            </FormRow>

            <FormRow label="Breakfast price">
                <Input
                    type="number"
                    id="breakfast-price"
                    disabled={isUpdating}
                    {...register("breakfastPrice")}
                    onBlur={(e) => handleUpdate(e, "breakfastPrice")}
                />
            </FormRow>
        </Form>
    );
};

export default UpdateSettingsForm;
