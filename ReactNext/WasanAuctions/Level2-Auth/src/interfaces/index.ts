export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  created_at: Date;
  is_active: boolean;
  profile_pic?: string;
}

export interface ICategory {
  id: string;
  name: string;
  description?: string;
  image?: string;
  is_active: boolean;
  created_at: Date;
  updated_at?: Date;
}

export interface IListing {
  id: string;
  name: string;
  description: string;
  category_id: string;
  auction_start_at: string;
  auction_end_at: string;
  result_announcement_at: string;
  minimum_bid: number;
  winner_id: number;
  images: string[];
  is_active: boolean;
  created_at: Date;

  // runtime fields
  category?: ICategory;
  winner?: IUser;
}

export interface IBid {
  id: string;
  listing_id: string;
  user_id: string;
  bid_amount: number;
  platform_fee: number;
  status: "active" | "won" | "lost";
  payment_id?: string;
  created_at: Date;

  // runtime fields
  listing?: IListing;
  user?: IUser;
}