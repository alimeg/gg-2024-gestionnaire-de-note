"use client";

import { useState, useEffect, startTransition } from 'react';
import { Note as NoteType } from "@/db/schemas/notes";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import ArchiveButton from "./ArchiveButton";
import { archiveNoteAction, unarchiveNoteAction } from '@/actions/notes';
import { toast } from 'react-hot-toast';

type Props = {
  note: NoteType;
  mode: 'archive' | 'unarchive'; // Mode should be 'archive' or 'unarchive'
};

function Note({ note, mode }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  const handleArchiveNote = async () => {
    startTransition(async () => {
      const { errorMessage } = await archiveNoteAction(note.id);
      if (!errorMessage) {
        toast.success("Note archived successfully");
      } else {
        toast.error(errorMessage);
      }
    });
  };

  const handleUnarchiveNote = async () => {
    startTransition(async () => {
      const { errorMessage } = await unarchiveNoteAction(note.id);
      if (!errorMessage) {
        toast.success("Note unarchived successfully");
      } else {
        toast.error(errorMessage);
      }
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'a' && isHovered) {
        if (mode === 'archive') {
          handleArchiveNote();
        } else if (mode === 'unarchive') {
          handleUnarchiveNote();
        }
        console.log(`Hello, this is me: ${note.id}`);
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
            isArchived={note.isArchived}
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
