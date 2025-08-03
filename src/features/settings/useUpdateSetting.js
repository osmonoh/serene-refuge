import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

export const useUpdateSetting = () => {
    // useQueryClient hook gives us acces to queryClient and we can use it in useMutation: onSucces to invalidate data after mutation and that refetches the new (mutated) data
    const queryClient = useQueryClient();

    const { isPending, mutate } = useMutation({
        mutationFn: updateSetting,
        onSuccess: () => {
            toast.success("Setting successfully updated");

            queryClient.invalidateQueries({
                queryKey: ["settings"]
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return { isPending, mutate };
};
