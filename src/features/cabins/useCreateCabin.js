import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createUpdateCabin } from "../../services/apiCabins";

export const useCreateCabin = () => {
    // useQueryClient hook gives us acces to queryClient and we can use it in useMutation: onSucces to invalidate data after mutation and that refetches the new (mutated) data
    const queryClient = useQueryClient();

    const { isPending, mutate } = useMutation({
        mutationFn: createUpdateCabin,
        onSuccess: () => {
            toast.success("New cabin successfully created");

            queryClient.invalidateQueries({
                queryKey: ["cabins"]
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return { isPending, mutate };
};
