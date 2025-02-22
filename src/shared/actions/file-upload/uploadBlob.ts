import { SessionUser } from "@core/auth/lucia";
import { withAuth } from "@utils/security/auth";
import { put } from "@vercel/blob";

/*
Uploads an image to the blob and returns the URL of the image if successful.
*/

export const uploadBlob = withAuth(
  async (user: SessionUser, file: File, maxSizeInMb: number) => {
    if (!file) throw new Error("Please select an image to upload.");

    if (file.size / 1024 / 1024 > maxSizeInMb)
      throw new Error(
        `File size ${file.size / 1024 / 1024}MB is too large. Max ${maxSizeInMb}MB`,
      );

    try {
      const blob = await put(`${user.id}-${Date.now()}-${file.name}`, file, {
        contentType: file.type,
        access: "public",
      });

      return blob;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
);
