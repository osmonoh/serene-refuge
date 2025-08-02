import supabase from "./supabase";

export const getCabins = async () => {
    const { data, error } = await supabase.from("cabins").select("*");

    if (error) {
        console.error(error);
        throw new Error("Cabins couldn't be loaded");
    }

    return data;
};

export const createCabin = async (newCabin) => {
    const { data, error } = await supabase
        .from("cabins")
        .insert([newCabin])
        .select();

    if (error) {
        console.error(error);
        throw new Error("Cabin couldn't be created");
    }

    return data;
};

export const deleteCabin = async (id) => {
    const { error, data } = await supabase.from("cabins").delete().eq("id", id);

    if (error) {
        console.error(error);
        throw new Error("Cabin couldn't be deleted");
    }

    return data;
};
