import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export const useCabins = () => {
    const {
        isLoading,
        data: cabins,
        error
    } = useQuery({
        queryKey: ["cabins"],
        queryFn: getCabins // queryFn needs to return a promise
    });

    return { isLoading, error, cabins };
};
