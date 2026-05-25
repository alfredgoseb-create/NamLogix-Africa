import { supabase } from "@/lib/supabaseClient";

type UploadResult = {
  url: string | null;
  error: string | null;
};

export async function uploadFileToBucket(
  bucket: string,
  folder: string,
  file: File
): Promise<UploadResult> {
  try {
    if (!file) {
      return {
        url: null,
        error: "No file selected.",
      };
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;

    const filePath = `${folder}/${fileName}`;

    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (error) {
      return {
        url: null,
        error: error.message,
      };
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

    return {
      url: data.publicUrl,
      error: null,
    };
  } catch (error: any) {
    return {
      url: null,
      error: error.message || "Upload failed.",
    };
  }
}