import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createUpdateCabin } from "../../services/apiCabins";

export const useUpdateCabin = () => {
    // useQueryClient hook gives us acces to queryClient and we can use it in useMutation: onSucces to invalidate data after mutation and that refetches the new (mutated) data
    const queryClient = useQueryClient();

    const { isPending, mutate } = useMutation({
        mutationFn: ({ newCabinData, id }) =>
            createUpdateCabin(newCabinData, id), // mutationFn can accept only one parameter so as a workaround passing in an object and destructuring
        onSuccess: () => {
            toast.success("Cabin successfully updated");

            queryClient.invalidateQueries({
                queryKey: ["cabins"]
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return { isPending, mutate };
};
