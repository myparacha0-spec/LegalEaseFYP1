"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type Profile = {
  id: string;
  full_name: string | null;
  phone: string | null;
  cnic: string | null;
  city: string | null;
  area: string | null;
};

export type ProfileUpdate = {
  full_name: string;
  phone: string;
  cnic: string;
  city: string;
  area: string;
};

export type UpdateProfileResult =
  | { success: true }
  | { success: false; error: string };

export async function getProfile(): Promise<Profile | null> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return null;
    }

    const { data, error } = await supabase
      .from("users")
      .select("id, full_name, phone, cnic, city, area")
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Failed to load profile:", error);
    return null;
  }
}

export async function updateProfile(
  data: ProfileUpdate
): Promise<UpdateProfileResult> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        success: false,
        error: "You must be signed in to update your profile.",
      };
    }

    const { error } = await supabase
      .from("users")
      .update({
        full_name: data.full_name,
        phone: data.phone,
        cnic: data.cnic,
        city: data.city,
        area: data.area,
      })
      .eq("id", user.id);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/citizen/profile");
    return { success: true };
  } catch (error) {
    console.error("Failed to update profile:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update profile.",
    };
  }
}
