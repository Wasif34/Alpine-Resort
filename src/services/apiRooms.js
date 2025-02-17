import supabase, { supabaseUrl } from "./supabase";
export async function getRooms() {
  let { data, error } = await supabase.from("Room").select("*");

  if (error) {
    console.error(error);
    throw new Error("Rooms could not be loaded");
  }
  return data;
}

export async function deleteRoom(id) {
  const { error, data } = await supabase.from("Room").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Room could not be deleted");
  }
  return data;
}

export async function addRoom(room, id) {
  console.log("the room adn id", room, id);
  const hasImagePath = room.imageUrl?.startsWith?.(supabaseUrl);

  console.log("HAS IMAGE PATH", hasImagePath);

  const imageName = `${Math.random()}-${room.imageUrl.name}`.replaceAll(
    "/",
    ""
  );

  //https://awazfccevasvubsusjpd.supabase.co/storage/v1/object/public/Room%20Bucket//exec%20villa3.jpg
  const imagePath = hasImagePath
    ? room.imageUrl
    : `${supabaseUrl}/storage/v1/object/public/Room%20Bucket/${imageName}`;

  if (!id) {
    const { data, error } = await supabase
      .from("Room")
      .insert({ ...room, imageUrl: imagePath })
      .select();

    if (error) {
      console.error(error);
      throw new Error("Room could not be added");
    }
    const { error: storageError } = await supabase.storage
      .from("Room Bucket")
      .upload(imageName, room.imageUrl);
    if (storageError) {
      await supabase.from("Room").delete().eq("id", data.id);
      console.error(storageError);
      throw new Error("Room image could not be uploaded");
    }

    return data;
  }

  if (id) {
    const { data, error } = await supabase
      .from("Room")
      .update({ ...room, imageUrl: imagePath })
      .eq("id", id);

    console.log("DATAhaha", data);

    if (error) {
      console.error(error);
      throw new Error("Room could not be updated");
    }

    if (!hasImagePath) {
      const { error: storageError } = await supabase.storage
        .from("Room Bucket")
        .upload(imageName, room.imageUrl);
      if (storageError) {
        console.error(storageError);
        throw new Error("Room image could not be uploaded");
      }
    }

    return data;
  }
}

export async function getRoom(id) {
  const { data, error } = await supabase
    .from("Room")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Room could not be loaded");
  }
  return data;
}
