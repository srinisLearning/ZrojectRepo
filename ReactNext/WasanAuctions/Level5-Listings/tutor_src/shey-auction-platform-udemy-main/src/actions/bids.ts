"use server";

import supabaseConfig from "@/config/supabase-config";
import { IBid } from "@/interfaces";

export const addNewBid = async (payload: Partial<IBid>) => {
  try {
    const { data, error } = await supabaseConfig.from("bids").insert([payload]);
    if (error) {
      throw new Error(error.message);
    }
    return {
      success: true,
      message: "Bid added successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getBidsByUserId = async (userId: string) => {
  try {
    const { data, error } = await supabaseConfig
      .from("bids")
      .select("* , listing:listings(*)")
      .order("created_at", { ascending: false })
      .eq("user_id", userId);

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      data: [],
    };
  }
};

export const getAllBids = async () => {
  try {
    const { data, error } = await supabaseConfig
      .from("bids")
      .select("* , listing:listings(*) , user:user_profiles(*)")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      data: [],
    };
  }
};

export const getBidsByListingId = async (listingId: string) => {
  try {
    const { data, error } = await supabaseConfig
      .from("bids")
      .select("* , user:user_profiles(*)")
      .order("created_at", { ascending: false })
      .eq("listing_id", listingId);

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      data: [],
    };
  }
};

export const updateWinnerBid = async ({
  bidId,
  listingId,
  winnderId,
}: {
  bidId: string;
  listingId: string;
  winnderId: string;
}) => {
  try {
    const listingUpdate = await supabaseConfig
      .from("listings")
      .update({
        winner_id: winnderId,
      })
      .eq("id", listingId);

    if (listingUpdate.error) {
      throw new Error(listingUpdate.error.message);
    }

    const bidUpdate = await supabaseConfig
      .from("bids")
      .update({
        status: "won",
      })
      .eq("id", bidId);

    if (bidUpdate.error) {
      throw new Error(bidUpdate.error.message);
    }

    return {
      success: true,
      message: "Winner bid updated successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
