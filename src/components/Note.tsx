
"use client"
import { useState, useEffect } from 'react';
import { Note as NoteType } from "@/db/schemas/notes";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import ArchiveButton from "./ArchiveButton";
import { handleArchiveNote } from "@/lib/handleArchiveNote";
import { handleUnarchiveNote } from '@/lib/handleUnArchiveNote';
import { motion } from 'framer-motion';

type Props = {
  note: NoteType;
  mode: 'archive' | 'unarchive'; // Mode should be 'archive' or 'unarchive'
};

function Note({ note, mode }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);
  const [isAPressed, setIsAPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey) {
        setIsCtrlPressed(true);
      }
      if (event.key === 'a') {
        setIsAPressed(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (!event.ctrlKey) {
        setIsCtrlPressed(false);
      }
      if (event.key === 'a') {
        setIsAPressed(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (isCtrlPressed && isAPressed && isHovered && (mode === 'archive' || mode === 'unarchive')) {
      if (mode === 'archive') {
        handleArchiveNote(note.id);
        
      } else if (mode === 'unarchive') {
        handleUnarchiveNote(note.id);
      }
    }
  }, [isCtrlPressed, isAPressed, isHovered, mode, note.id]);

  const animation = {
    scale: isHovered ? (isCtrlPressed ? 0.8 : 1.2) : 1,
    rotate: isHovered ? (isCtrlPressed ? [0, 15, -15, 15, 0] : [0, 10, -10, 10, 0]) : 0,
    backgroundColor: isHovered ? (isCtrlPressed ? 'yellow' : 'rgb(var(--popout))') : 'rgb(var(--muted))',
    color: isHovered && isCtrlPressed ? 'red' : 'inherit',
    border: isHovered ? (isCtrlPressed ? '2px solid red' : '2px solid lightblue') : '1px solid gray', // Bordures
    boxShadow: isHovered ? (isCtrlPressed ? '0 4px 8px rgba(255, 0, 0, 0.5)' : '0 4px 8px rgb(var(--popout))') : '0 2px 4px rgba(0, 0, 0, 0.2)'
  };

  return (
    <motion.div
      initial={{ backgroundColor: 'rgb(var(--muted))' }}
      animate={animation}
      transition={{ 
        duration: 0.6, 
        ease: "easeInOut",
        times: [0, 0.25, 0.5, 0.75, 1] // Points de temps pour l'oscillation
      }}
      style={{ 
        padding: '20px', 
        borderRadius: '10px',
        color: 'inherit' // Couleur de texte par défaut
      }}
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
    </motion.div>
  );
}

export default Note;
