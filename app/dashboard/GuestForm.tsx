'use client';

import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';
import { addGuest } from '@/app/actions'; 
import { useEffect, useRef } from 'react';

// Tombol submit kustom untuk menunjukkan status 'pending'
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="px-4 py-2 bg-gold text-white rounded-lg disabled:bg-gray-400"
    >
      {pending ? 'Menyimpan...' : 'Tambah Tamu'}
    </button>
  );
}

export function GuestForm() {
  const initialState = { success: false, message: '' };
  const [state, formAction] = useActionState(addGuest, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <div>
        <label htmlFor="guestName" className="block mb-2 font-medium">
          Nama Tamu
        </label>
        <input
          type="text"
          id="guestName"
          name="guestName"
          required
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Contoh: Budi dan Keluarga"
        />
      </div>
      <SubmitButton />

      {/* Tampilkan pesan sukses atau error */}
      {state.message && (
        <p className={state.success ? 'text-green-600' : 'text-red-600'}>
          {state.message}
        </p>
      )}
    </form>
  );
}