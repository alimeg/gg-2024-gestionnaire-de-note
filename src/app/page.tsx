import Header from "@/components/Header";
import Note from "@/components/Note";
import db from "@/db";
import { notes } from "@/db/schemas/notes";
import { getUser } from "@/lib/auth";
import { desc, eq } from "drizzle-orm";

export default async function Home() {
  const user = await getUser();

  
  //console.log("Authenticated User ID:", user.id);

  const _notes = await db
  .select()
  .from(notes)
  .where(
    eq(notes.userId, user.id) // Match user ID
    //&& (eq(notes.isArchived, false)) // Match isArchived condition
  )
  .orderBy(desc(notes.updatedAt));

 // console.log("Fetched Notes:", _notes);

  // Filter notes to include archived ones
  const visibleNotes = _notes.filter(note => !note.isArchived);

  return (
    <main className="flex min-h-screen flex-col items-center px-4 pb-24">
      <Header title="Notes" />

      <div className="mt-8 grid w-full max-w-[1800px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleNotes.map(note => (
          <Note key={note.id} note={note} />
        ))}
      </div>
    </main>
  );
}
