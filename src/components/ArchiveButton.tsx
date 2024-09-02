
"use client";

import { Archive } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { archiveNoteAction, unarchiveNoteAction } from "@/actions/notes";

interface ArchiveButtonProps {
  noteId: number;
  isArchived: boolean; 
  mode: 'archive' | 'unarchive'; 
}

function ArchiveButton({ noteId, isArchived, mode }: ArchiveButtonProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleAction = async () => {
    startTransition(async () => {
      let errorMessage: string | null = null;
      
      if (mode === 'archive') {
        const result = await archiveNoteAction(noteId);
        errorMessage = result.errorMessage;
      } else if (mode === 'unarchive') {
        const result = await unarchiveNoteAction(noteId);
        errorMessage = result.errorMessage;
      }

      if (!errorMessage) {
        toast.success(`Note ${mode === 'archive' ? 'archived' : 'unarchived'} successfully`);
        setOpen(false);
      } else {
        toast.error(errorMessage);
      }
    });
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger onClick={() => setOpen(true)}>
        <Archive className={`text-muted-foreground size-5`} />
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          {mode === 'archive' ? 'Are you sure you want to archive this note?' : 'Are you sure you want to unarchive this note?'}
        </AlertDialogHeader>
        <AlertDialogDescription>
          {mode === 'archive' ? 'Archiving the note will move it to the archive section.' : 'Unarchiving the note will move it back to the active notes.'}
        </AlertDialogDescription>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending} onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            type="submit"
            className="bg-primary hover:bg-primary/80"
            disabled={isPending}
            onClick={handleAction}
          >
            {isPending ? `${mode === 'archive' ? 'Archiving' : 'Unarchiving'} Note...` : `${mode === 'archive' ? 'Archive' : 'Unarchive'} Note`}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ArchiveButton;
