import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

// this form is used for creating and also editing cabin
function CreateCabinForm({ cabinToEdit = {} }) {
    const { id: editId, ...editValues } = cabinToEdit;
    const isEditSession = Boolean(editId);

    // no need to make the inputs controlled we use useForm from "react-hook-form" (register)
    // to pass values into inputs we can add an options object to useForm (in this case we want to pass defaultValues only if we are editing not creating cabin)
    const { register, handleSubmit, reset, getValues, formState } = useForm({
        defaultValues: isEditSession ? editValues : {}
    });
    const { errors } = formState;

    const { isPending: isCreating, mutate: createCabin } = useCreateCabin();
    const { isPending: isEditing, mutate: editCabin } = useEditCabin();

    const isWorking = isCreating || isEditing;

    const onSubmit = (data) => {
        const image =
            typeof data.image === "string" ? data.image : data.image[0];

        if (isEditSession) {
            editCabin(
                { newCabinData: { ...data, image }, id: editId },
                {
                    onSuccess: (dataFromMutationFn) => {
                        console.log(dataFromMutationFn);
                        reset();
                    }
                } // we can use an options object as a second argument (we also get access to the data returned from mutationFn - createEditCabin - here just console log for illustration) - here onSuccess we call reset() to clear the form (as now we cannot directly use it in useMutation since we moved it to the custom hook useEditCabin)
            );
        } else {
            createCabin(
                { ...data, image },
                {
                    onSuccess: (dataFromMutationFn) => {
                        console.log(dataFromMutationFn);
                        reset();
                    }
                } // we can use an options object as a second argument (we also get access to the data returned from mutationFn - createEditCabin - here just console log for illustration) - here onSuccess we call reset() to clear the form (as now we cannot directly use it in useMutation since we moved it to the custom hook useCreateCabin)
            );
        }
    };

    const onError = (errors) => {
        // this is not doing anything now but to see that it exists (it is being called as a second arg in handleSubmit when there are errors and the first arg - onSubmit is not being called)
        // the same errors are also comming from formState
        console.log(errors);
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
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
                        required: isEditSession
                            ? false
                            : "This field is required"
                    })}
                />
            </FormRow>

            <FormRow>
                {/* here type is an HTML attribute! => reset */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isWorking}>
                    {isEditSession ? "Edit cabin" : "Create new cabin"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
