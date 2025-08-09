import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";
import Input from "../../ui/form/Input";
import Form from "../../ui/form/Form";
import Button from "../../ui/interactive/Button";
import FileInput from "../../ui/form/FileInput";
import Textarea from "../../ui/form/Textarea";
import FormRow from "../../ui/form/FormRow";

// this form is used for creating and also updating cabin
const CreateUpdateCabinForm = ({ cabinToUpdate = {}, onCloseModal }) => {
    const { id: updateId, ...updateValues } = cabinToUpdate;
    const isUpdateSession = Boolean(updateId);

    // no need to make the inputs controlled we use useForm from "react-hook-form" (register)
    // to pass values into inputs we can add an options object to useForm (in this case we want to pass defaultValues only if we are updating not creating cabin)
    const { register, handleSubmit, reset, getValues, formState } = useForm({
        defaultValues: isUpdateSession ? updateValues : {}
    });
    const { errors } = formState;

    const { isPending: isCreating, mutate: createCabin } = useCreateCabin();
    const { isPending: isUpdating, mutate: updateCabin } = useUpdateCabin();

    const isWorking = isCreating || isUpdating;

    const onSubmit = (data) => {
        const image =
            typeof data.image === "string" ? data.image : data.image[0];

        if (isUpdateSession) {
            updateCabin(
                { newCabinData: { ...data, image }, id: updateId },
                {
                    onSuccess: (dataFromMutationFn) => {
                        console.log(dataFromMutationFn);
                        reset();
                        onCloseModal?.(); // in case we use this form outside of a modal this onCloseModal function would be undefined so we call it here conditionally only if it exists
                    }
                } // we can use an options object as a second argument (we also get access to the data returned from mutationFn - createUpdateCabin - here just console log for illustration) - here onSuccess we call reset() to clear the form (as now we cannot directly use it in useMutation since we moved it to the custom hook useUpdateCabin)
            );
        } else {
            createCabin(
                { ...data, image },
                {
                    onSuccess: (dataFromMutationFn) => {
                        console.log(dataFromMutationFn);
                        reset();
                        onCloseModal?.(); // in case we use this form outside of a modal this onCloseModal function would be undefined so we call it here conditionally only if it exists
                    }
                } // we can use an options object as a second argument (we also get access to the data returned from mutationFn - createUpdateCabin - here just console log for illustration) - here onSuccess we call reset() to clear the form (as now we cannot directly use it in useMutation since we moved it to the custom hook useCreateCabin)
            );
        }
    };

    const onError = (errors) => {
        // this is not doing anything now but to see that it exists (it is being called as a second arg in handleSubmit when there are errors and the first arg - onSubmit is not being called)
        // the same errors are also comming from formState
        console.log(errors);
    };

    return (
        <Form
            onSubmit={handleSubmit(onSubmit, onError)}
            type={onCloseModal ? "modal" : "regular"}
        >
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    disabled={isWorking}
                    {...register("name", {
                        required: "This field is required"
                    })}
                />
            </FormRow>

            <FormRow
                label="Maximum capacity"
                error={errors?.maxCapacity?.message}
            >
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isWorking}
                    {...register("maxCapacity", {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: "Capacity should be at least 1"
                        }
                    })}
                />
            </FormRow>

            <FormRow
                label="Regular price"
                error={errors?.regularPrice?.message}
            >
                <Input
                    type="number"
                    id="regularPrice"
                    disabled={isWorking}
                    {...register("regularPrice", {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: "Regular price should be at least 1"
                        }
                    })}
                />
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input
                    type="number"
                    id="discount"
                    defaultValue={0}
                    disabled={isWorking}
                    {...register("discount", {
                        required: "This field is required",
                        validate: (value) =>
                            Number(value) <= Number(getValues().regularPrice) ||
                            "Discount cannot be higher then the regular price"
                    })}
                />
            </FormRow>

            <FormRow
                label="Description for website"
                error={errors?.description?.message}
            >
                <Textarea
                    type="number"
                    id="description"
                    defaultValue=""
                    disabled={isWorking}
                    {...register("description", {
                        required: "This field is required"
                    })}
                />
            </FormRow>

            <FormRow label="Cabin photo">
                <FileInput
                    id="image"
                    accept="image/*"
                    // type="file" // we can set this in the component file (FileInput) with attrs() property on styled
                    {...register("image", {
                        required: isUpdateSession
                            ? false
                            : "This field is required"
                    })}
                />
            </FormRow>

            <FormRow>
                {/* here type is an HTML attribute! => reset */}
                <Button
                    variation="secondary"
                    type="reset"
                    onClick={() => onCloseModal?.()} // in case we use this form outside of a modal this onCloseModal function would be undefined so we call it here conditionally only if it exists
                >
                    Cancel
                </Button>
                <Button disabled={isWorking}>
                    {isUpdateSession ? "Update cabin" : "Create new cabin"}
                </Button>
            </FormRow>
        </Form>
    );
};

export default CreateUpdateCabinForm;
