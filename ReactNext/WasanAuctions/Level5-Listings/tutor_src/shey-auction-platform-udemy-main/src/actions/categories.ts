"use server";

import supabaseConfig from "@/config/supabase-config";
import { ICategory } from "@/interfaces";

export const createCategory = async (payload: Partial<ICategory>) => {
  try {
    const { data, error } = await supabaseConfig
      .from("categories")
      .insert([payload]);
    if (error) {
      throw new Error(error.message);
    }
    return {
      success: true,
      message: "Category created successfully",
      data: data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const updateCategory = async (
  id: string,
  payload: Partial<ICategory>
) => {
  try {
    const { data, error } = await supabaseConfig
      .from("categories")
      .update(payload)
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      message: "Category updated successfully",
      data: data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const { data, error } = await supabaseConfig
      .from("categories")
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      message: "Category deleted successfully",
      data: data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getAllCategories = async () => {
  try {
    const { data, error } = await supabaseConfig.from("categories").select("*").order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      data: data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
