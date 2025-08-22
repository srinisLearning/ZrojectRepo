"use server";

import supabaseConfig from "@/config/supabase-config";
import { IListing } from "@/interfaces";
import dayjs from "dayjs";

export const addListing = async (listing: Partial<IListing>) => {
  try {
    const { error } = await supabaseConfig.from("listings").insert([listing]);

    if (error) {
      throw new Error(`Error adding listing: ${error.message}`);
    }

    return {
      success: true,
      message: "Listing added successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const updateListingById = async (
  id: string,
  payload: Partial<IListing>
) => {
  try {
    const { error } = await supabaseConfig
      .from("listings")
      .update(payload)
      .eq("id", id);

    if (error) {
      throw new Error(`Error updating listing: ${error.message}`);
    }

    return {
      success: true,
      message: "Listing updated successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const deleteListingById = async (id: string) => {
  try {
    const { error } = await supabaseConfig
      .from("listings")
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(`Error deleting listing: ${error.message}`);
    }

    return {
      success: true,
      message: "Listing deleted successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getListingById = async (id: string) => {
  try {
    const { data, error } = await supabaseConfig
      .from("listings")
      .select("* , categories(name)")
      .eq("id", id);

    if (error) {
      throw new Error(`Error fetching listing: ${error.message}`);
    }

    if (!data || data.length === 0) {
      return {
        success: false,
        message: "Listing not found",
      };
    }

    return {
      success: true,
      data: {
        ...data[0],
        category: data[0].categories || null,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getAllListings = async () => {
  try {
    const { data, error } = await supabaseConfig
      .from("listings")
      .select("* , categories(name)")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`Error fetching listings: ${error.message}`);
    }
    console.log("Fetched listings:", data);
    return {
      success: true,
      data: data.map((listing: any) => ({
        ...listing,
        category: listing.categories || null,
      })),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getAllAvailableListings = async (filters: any) => {
  try {
    let qry = supabaseConfig
      .from("listings")
      .select("* , categories(name)")
      .gte("auction_end_at", new Date().toISOString());

    if (filters.category && filters.category !== "null") {
      qry = qry.eq("category_id", filters.category);
    }

    if (filters.sortBy && filters.sortBy !== "null") {
      qry.order(
        "minimum_bid",
        filters.sortBy === "min_bid_asc"
          ? { ascending: true }
          : { ascending: false }
      );
    } else {
      qry = qry.order("created_at", { ascending: false });
    }

    const { data, error } = await qry;

    if (error) {
      throw new Error(`Error fetching available listings: ${error.message}`);
    }

    return {
      success: true,
      data: data.map((listing: any) => ({
        ...listing,
        category: listing.categories || null,
      })),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};