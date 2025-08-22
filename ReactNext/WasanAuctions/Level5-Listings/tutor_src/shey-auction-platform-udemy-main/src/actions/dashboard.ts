"use server";

import supabaseConfig from "@/config/supabase-config";

export const getAdminDashboardData = async () => {
  try {
    const [listingsResponse, bidsResponse] = await Promise.all([
      supabaseConfig.from("listings").select("*"),
      supabaseConfig.from("bids").select("*"),
    ]);

    const totalListings = listingsResponse.data?.length || 0;
    const totalBids = bidsResponse.data?.length || 0;
    const resultAnnouncedListings = listingsResponse.data?.filter(
      (listing) => listing.winner_id
    );
    const platformRevenue = bidsResponse.data?.reduce(
      (acc, bid) => acc + (bid.platform_fee || 0),
      0
    );

    return {
      success: true,
      data: {
        totalListings,
        totalBids,
        resultAnnouncedListings: resultAnnouncedListings?.length || 0,
        platformRevenue: platformRevenue || 0,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
