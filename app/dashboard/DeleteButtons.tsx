'use client';

import { deleteGuest, deleteGuestbookEntry } from '@/app/actions';
import { useFormStatus } from 'react-dom';

// --- Komponen untuk Hapus Tamu ---

function GuestDeleteButtonInternal() {
  const { pending } = useFormStatus();
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Tampilkan dialog konfirmasi
    if (!window.confirm('Yakin ingin menghapus tamu ini? Tindakan ini tidak bisa dibatalkan.')) {
      event.preventDefault(); // Batalkan submit jika user klik "Cancel"
    }
  };

  return (
    <button 
      type="submit"
      onClick={handleClick}
      disabled={pending}
      className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400"
    >
      {pending ? 'Menghapus...' : 'Hapus'}
    </button>
  );
}

export function DeleteGuestButton({ guestId }: { guestId: string }) {
  return (
    <form action={deleteGuest}>
      <input type="hidden" name="guestId" value={guestId} />
      <GuestDeleteButtonInternal />
    </form>
  );
}


// --- Komponen untuk Hapus Ucapan ---

function EntryDeleteButtonInternal() {
  const { pending } = useFormStatus();
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Tampilkan dialog konfirmasi
    if (!window.confirm('Yakin ingin menghapus ucapan ini? Tindakan ini tidak bisa dibatalkan.')) {
      event.preventDefault(); // Batalkan submit
    }
  };

  return (
    <button 
      type="submit"
      onClick={handleClick}
      disabled={pending}
      className="px-3 py-1 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:bg-gray-400"
    >
      {pending ? '...' : 'Hapus'}
    </button>
  );
}

export function DeleteGuestbookEntryButton({ entryId }: { entryId: string }) {
  return (
    <form action={deleteGuestbookEntry}>
      <input type="hidden" name="entryId" value={entryId} />
      <EntryDeleteButtonInternal />
    </form>
  );
}