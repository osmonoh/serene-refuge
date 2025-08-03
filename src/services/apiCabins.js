import supabase, { supabaseUrl } from "./supabase";

export const getCabins = async () => {
    const { data, error } = await supabase.from("cabins").select("*");

    if (error) {
        console.error(error);
        throw new Error("Cabins couldn't be loaded");
    }

    return data;
};

export const createUpdateCabin = async (newCabin, id) => {
    // to check if by updating there is a new image being uploaded or an existing one being used (for existing there is just the supabase path, for a new one there is the actual image that needs to be uploaded)
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

    // Math.random() just to ensure that it has a unique name, replace() because supabase creates folders if the name contains any slashes '/'
    const imageName = `${Math.random()}-${newCabin.image.name}`.replace(
        "/",
        ""
    );

    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // 1. Create/update a cabin

    let query = supabase.from("cabins");

    // A) CREATE
    if (!id) {
        query = query.insert([{ ...newCabin, image: imagePath }]);
    }

    // B) UPDATE
    if (id) {
        query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
    }

    const { data, error } = await query.select().single(); // adding single() will save only the cabin object into data const and not the array - that's what we return from the function

    if (error) {
        console.error(error);
        throw new Error("Cabin couldn't be created");
    }

    // this if (!hasImagePath) added for updating cabin in case we are not changing an already uploaded image
    if (!hasImagePath) {
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
