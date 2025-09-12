import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export const useUpdateUser = () => {
    // useQueryClient hook gives us acces to queryClient and we can use it in useMutation: onSucces to invalidate data after mutation and that refetches the new (mutated) data
    const queryClient = useQueryClient();

    const { isPending, mutate } = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: ({ user }) => {
            toast.success("User successfully updated");

            queryClient.setQueryData(["user"], user);

            // queryClient.invalidateQueries({
            //     queryKey: ["user"]
            // });
        },
        onError: (err) => toast.error(err.message)
    });

    return { isPending, mutate };
};
