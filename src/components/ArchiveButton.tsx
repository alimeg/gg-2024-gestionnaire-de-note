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
import { archiveNoteAction } from "@/actions/notes";

interface ArchiveButtonProps {
  noteId: number;
  isArchived: boolean;
}

function ArchiveButton({ noteId }: ArchiveButtonProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleArchiveNote = async () => {
    startTransition(async () => {
      const { errorMessage } = await archiveNoteAction(noteId);
      if (!errorMessage) {
        setOpen(false);
        toast.success("Note archived successfully");
      } else {
        toast.error(errorMessage);
      }
    });
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger
       
        onClick={() => setOpen(true)}
      >
        <Archive className="text-muted-foreground size-5" />
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          Are you sure you want to archive this note?
        </AlertDialogHeader>
        <AlertDialogDescription>
          Archiving the note will move it to the archive section.
        </AlertDialogDescription>

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isPending}
            onClick={() => setOpen(false)}
          >
            Cancel
          </AlertDialogCancel>

          <form action={handleArchiveNote}>
            <AlertDialogAction
              type="submit"
              className="bg-primary hover:bg-primary/80"
              disabled={isPending}
            >
              {isPending ? "Archiving Note..." : "Archive Note"}
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ArchiveButton;

