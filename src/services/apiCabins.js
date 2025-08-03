import supabase, { supabaseUrl } from "./supabase";

export const getCabins = async () => {
    const { data, error } = await supabase.from("cabins").select("*");

    if (error) {
        console.error(error);
        throw new Error("Cabins couldn't be loaded");
    }

    return data;
};

export const createCabin = async (newCabin) => {
    // Math.random() just to ensure that it has a unique name, replace() because supabase creates folders if the name contains any slashes '/'
    const imageName = `${Math.random()}-${newCabin.image.name}`.replace(
        "/",
        ""
    );

    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // 1. Create a cabin
    const { data, error } = await supabase
        .from("cabins")
        .insert([{ ...newCabin, image: imagePath }])
        .select();

    if (error) {
        console.error(error);
        throw new Error("Cabin couldn't be created");
    }

    // 2. Upload image
    // only if there was no error in creating the cabin above
    const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin.image);

    // 3. Delete the cabin IF there was na error uploading the corresponding image
    if (storageError) {
        await supabase.from("cabins").delete().eq("id", data.id);
        console.error(storageError);
        throw new Error(
            "Cabin image couldn't be uploaded and the cabin was't created"
        );
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
