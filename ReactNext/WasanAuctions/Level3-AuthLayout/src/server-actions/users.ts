"use server";

import supabaseConfig from "@/config/supabase-config";
import { IUser } from "@/interfaces"; 
import bcrypt from "bcryptjs"; 
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const registerUser = async (payload: Partial<IUser>) => {
  try {
    // step1 : Check if user already exists
    const { data: existingUser, error: userError } = await supabaseConfig
      .from("user_profiles")
      .select("*")
      .eq("email", payload.email);

    if (existingUser && existingUser.length > 0) {
      throw new Error("User already exists with this email.");
    }

    // step2 : Hash the password

    const hashedPassword = await bcrypt.hash(payload.password || "", 10);

    // step3 : Insert the user into the database

    const row = {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      role: "user",
      is_active: true,
      profile_pic: "",
    };

    const { data, error } = await supabaseConfig
      .from("user_profiles")
      .insert([row]);

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      message: "User registered successfully.",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const loginUser = async (
  email: string,
  password: string,
  role: string
) => {
  try {
    // step1: Check if user exists
    const { data: users, error: userError } = await supabaseConfig
      .from("user_profiles")
      .select("*")
      .eq("email", email);
    if (userError || !users || users.length === 0) {
      throw new Error("User not found with this email.");
    }
    const user = users[0] as IUser;

    if (user.role !== role) {
      throw new Error(`User does not have the role: ${role}.`);
    }

    // step2: compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password.");
    }

    // step3: Generate JWT token and return user data
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d",
      }
    );

    return {
      success: true,
      message: "Login successful.",
      data: {
        role: user.role,
        token,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getLoggedInUser = async () => {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;
    if (!token) {
      throw new Error("No token found. Please login again.");
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const { data: users, error } = await supabaseConfig
      .from("user_profiles")
      .select("* , id, name, email, role, profile_pic")
      .eq("id", decoded.id);

    if (error || !users || users.length === 0) {
      throw new Error("User not found.");
    }

    const user = users[0] as IUser;

    return {
      success: true,
      data: user,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};