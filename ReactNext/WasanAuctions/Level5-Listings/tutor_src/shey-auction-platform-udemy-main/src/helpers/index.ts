"use server";
import dayjs from "dayjs";
import supabaseConfig from "@/config/supabase-config";

export const uploadFileAndGetUrl = async (file: File) => {
  try {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabaseConfig.storage
      .from("default")
      .upload(fileName, file);
    if (error) {
      throw new Error(error.message);
    }

    const { data: urlData } = supabaseConfig.storage
      .from("default")
      .getPublicUrl(fileName);

    return {
      success: true,
      message: "File uploaded successfully",
      data: {
        url: urlData.publicUrl,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};


