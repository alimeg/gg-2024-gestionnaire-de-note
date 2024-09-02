
import { unarchiveNoteAction } from '@/actions/notes';
import { startTransition } from 'react';
import toast from 'react-hot-toast';

 
  export const HandleUnarchiveNote = async (noteId: number) => {
    startTransition(async () => {
      const { errorMessage } = await unarchiveNoteAction(noteId);
      if (!errorMessage) {
        toast.success("Note unarchived successfully");
      } else {
        toast.error(errorMessage);
      }
    });
  };