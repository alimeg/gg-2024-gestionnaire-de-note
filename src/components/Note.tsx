"use client";

import { useState, useEffect, startTransition } from 'react';
import { Note as NoteType } from "@/db/schemas/notes";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import ArchiveButton from "./ArchiveButton";
import { HandleArchiveNote } from "@/lib/handleArchiveNote"
import { archiveNoteAction, unarchiveNoteAction } from '@/actions/notes';
import { toast } from 'react-hot-toast';
import { HandleUnarchiveNote } from '@/lib/handleUnArchiveNote';

type Props = {
  note: NoteType;
  mode: 'archive' | 'unarchive'; // Mode should be 'archive' or 'unarchive'
};

function Note({ note, mode }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'a' && isHovered) {
        if (mode === 'archive') {
          HandleArchiveNote(note.id);
        } else if (mode === 'unarchive') {
          HandleUnarchiveNote(note.id);
        }
       // console.log(`Hello, this is me: ${note.id}`);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isHovered, mode]);

  return (
    <div
      className="custom-scrollbar bg-muted/80 h-96 w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap break-words rounded-lg p-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mb-2 flex items-center gap-2">
        <h2 className="text-muted-foreground text-lg font-semibold">
          {note.updatedAt.toISOString().slice(0, 10)}
        </h2>
        <div className="flex items-center gap-2">
          <EditButton note={note} />
          <ArchiveButton
            noteId={note.id}
            isArchived={note.isArchived ?? false} 
            mode={mode}
          />
        </div>
        <DeleteButton noteId={note.id} />
      </div>
      <p>{note.text}</p>
    </div>
  );
}

export default Note;
