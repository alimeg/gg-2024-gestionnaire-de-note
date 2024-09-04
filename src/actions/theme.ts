/*"use server";

import db from "@/db";
import { notes } from "@/db/schemas/notes";
import { getUser } from "@/lib/auth";
import { getErrorMessage } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// theme action set
export const setThemeAction = async (formData: FormData) => {
    try {
      const user = await getUser();
      const theme = formData.get("theme") as string;
  
      // Validate theme value
      if (!['dark', 'light'].includes(theme)) {
        throw new Error('Invalid theme value');
      }
  
      // Update the theme for the user in the notes table
      await db
        .update(notes)
        .set({ theme })
        .where(eq(notes.userId, user.id));
  
      revalidatePath("/");
  
      return { errorMessage: null };
    } catch (error) {
      return { errorMessage: getErrorMessage(error) };
    }
  };
  // theme action get

// theme action get
export const getThemeAction = async () => {
    try {
      // Get the current user
      const user = await getUser();
  
      console.log("User:", user);
  
      // Fetch the theme for the user from any note in the notes table
      const userNotes = await db
        .select()
        .from(notes)
        .where(eq(notes.userId, user.id))
        .limit(1); // Fetch one note for the user
  
      console.log("User Notes:", userNotes);
  
      // Extract the theme value from the fetched note
      const theme = userNotes.length > 0 ? userNotes[0].theme : 'dark'; // Default to 'dark' if no notes found
  
      console.log("Fetched Theme:", theme);
  
      return { theme, errorMessage: null };
    } catch (error) {
      console.error("Error getting theme:", error);
      return { theme: 'dark', errorMessage: getErrorMessage(error) }; // Default to 'dark' if there's an error
    }
  };
  */