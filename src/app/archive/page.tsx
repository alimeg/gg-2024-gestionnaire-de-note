

import Header from "@/components/Header"
import Note from "@/components/Note";
import db from "@/db";
import { notes } from "@/db/schemas/notes";
import { getUser } from "@/lib/auth";
import { eq, desc } from "drizzle-orm";

export default async function archiveNotes() {
  const user = await getUser();
  const _archivedNotes = await db
    .select()
    .from(notes)
    .where(eq(notes.userId, user.id))
    .orderBy(desc(notes.updatedAt));

// Filter notes to exclude archived ones
const visibleNotes = _archivedNotes.filter(note => note.isArchived);
  return (
    <main className="flex min-h-screen flex-col items-center px-4 pb-24">
     <Header title="Archive" isArchivePage={true} />

      <div className="mt-8 grid w-full max-w-[1800px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        
          {visibleNotes.length > 0 ? (
            visibleNotes.map((note) => (
              <Note key={note.id} note={note} />
            ))
          ) : (
            <p>No archived notes found.</p>
        )}
      </div>
    </main>
  );
}