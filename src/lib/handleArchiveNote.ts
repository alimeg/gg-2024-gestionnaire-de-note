import { archiveNoteAction } from '@/actions/notes';
import { startTransition } from 'react';
import toast from 'react-hot-toast';

 export const HandleArchiveNote = async (noteId: number) => {
    startTransition(async () => {
      const { errorMessage } = await archiveNoteAction(noteId);
      if (!errorMessage) {
        toast.success("Note archived successfully");
      } else {
        toast.error(errorMessage);
      }
    });
  };
