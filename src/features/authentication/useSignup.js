import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signup } from "../../services/apiAuth";

export const useSignup = () => {
    const { isPending, mutate } = useMutation({
        mutationFn: signup,
        onSuccess: (user) => {
            toast.success(
                "Account successfully created! Please verify the new account from the user's email address." // THIS IS SHOWN EVEN WHEN USER IS NOT CREATED WHEN ALREADY USED EMAIL IS USED AGAIN
            );
        }
    });

    return { isPending, mutate };
};
