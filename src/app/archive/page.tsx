

import Header from "@/components/Header"
import Note from "@/components/Note";
import db from "@/db";
import { notes } from "@/db/schemas/notes";
import { getUser } from "@/lib/auth";
import { and, eq, desc } from "drizzle-orm";

export default async function archiveNotes() {
  const user = await getUser();
  const _archivedNotes = await db
    .select()
    .from(notes)
    .where(and(eq(notes.userId, user.id), eq(notes.isArchived, true)))
    .orderBy(desc(notes.updatedAt));

  return (
    <main className="flex min-h-screen flex-col items-center px-4 pb-24">
     <Header title="Archive" isArchivePage={true} />

      <div className="mt-8 grid w-full max-w-[1800px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        
          {_archivedNotes.length > 0 ? (
            _archivedNotes.map((note) => (
              <Note key={note.id} note={note} mode="unarchive"/>
            ))
          ) : (
            <p>No archived notes found.</p>
        )}
      </div>
    </main>
  );
}