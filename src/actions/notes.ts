"use server";

import db from "@/db";
import { notes } from "@/db/schemas/notes";
import { getUser } from "@/lib/auth";
import { getErrorMessage } from "@/lib/utils";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const addNewNoteAction = async (formData: FormData) => {
  try {
    const user = await getUser();

    const text = formData.get("text") as string;

    await db.insert(notes).values({ text, userId: user.id });

    revalidatePath("/");

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

export const deleteNoteAction = async (noteId: number) => {
  try {
    const user = await getUser();

    await db
      .delete(notes)
      .where(and(eq(notes.id, noteId), eq(notes.userId, user.id)));

    revalidatePath("/");

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

export const editNoteAction = async (formData: FormData) => {
  try {
    const user = await getUser();

    const text = formData.get("text") as string;
    const noteId = formData.get("noteId") as string;

    await db
      .update(notes)
      .set({ text, updatedAt: new Date() })
      .where(and(eq(notes.id, Number(noteId)), eq(notes.userId, user.id)));

    revalidatePath("/");

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

// Archive action

export const archiveNoteAction = async (noteId: number) => {
  try {
    const user = await getUser();

    await db
      .update(notes)
      .set({ isArchived: true })
      .where(and(eq(notes.id, noteId), eq(notes.userId, user.id)));

    revalidatePath("/"); 

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

// UnArchive action
export const unarchiveNoteAction = async (noteId: number) => {
  try {
    const user = await getUser();

    await db
      .update(notes)
      .set({ isArchived: false })
      .where(and(eq(notes.id, noteId), eq(notes.userId, user.id)));

    revalidatePath("/");

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

/*/ theme action
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
};*/
