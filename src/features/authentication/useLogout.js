import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/apiAuth";

export const useLogout = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { isPending, mutate } = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.removeQueries();
            navigate("/login", { replace: true });
        }
    });

    return { isPending, mutate };
};
