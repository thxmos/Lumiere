"use server";

import { del, put } from "@vercel/blob";
import { getUser } from "./session.actions";

export const uploadBlob = async (file: File, path: string) => {
  if (!file) {
    throw new Error("Please select an image to upload.");
  }

  // Max file size 50MB
  if (file.size / 1024 / 1024 > 50) {
    return null;
  }

  try {
    const { user } = await getUser();

    const blob = await put(`${path}${user?.id}`, file, {
      contentType: file.type,
      access: "public",
    });

    return blob;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteBlob = async (path: string) => {
  const { user } = await getUser();

  await del(`${path}${user?.id}`);
};
