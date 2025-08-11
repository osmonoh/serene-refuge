import { useSearchParams } from "react-router-dom";
import Select from "../form/Select";

const Sort = ({ options }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get("sort") || "";

    const handleChange = (e) => {
        searchParams.set("sort", e.target.value);

        setSearchParams(searchParams);
    };

    return (
        <Select
            value={sortBy}
            options={options}
            type="white"
            onChange={handleChange}
        />
    );
};

export default Sort;
