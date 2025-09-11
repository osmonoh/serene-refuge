import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { login } from "../../services/apiAuth";

export const useLogin = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { isPending, mutate } = useMutation({
        mutationFn: ({ email, password }) =>
            login({
                email,
                password
            }),
        onSuccess: (user) => {
            queryClient.setQueryData(["user"], user.user); // any other way to make the login work without this?
            navigate("/dashboard", { replace: true });
        },
        onError: (err) => {
            console.log("ERROR", err);
            toast.error("Provided email or password are incorrect");
        }
    });

    return { isPending, mutate };
};
