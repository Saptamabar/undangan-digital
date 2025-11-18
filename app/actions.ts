'use server';

import { db, type Guest } from '@/lib/db';
import { revalidatePath } from 'next/cache';

function createSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') 
    .replace(/[\s_]+/g, '-')     
    .slice(0, 50);               
}

type FormState = {
  success: boolean;
  message: string;
}

export type GuestbookEntry = {
  id: string;
  name: string;
  presence: string;
  message: string;
  created_at: string;
};

type RsvpFormState = {
  success: boolean;
  message: string;
}

export async function addGuest(
  prevState: FormState, 
  formData: FormData
): Promise<FormState> {

  const name = formData.get('guestName') as string;

  if (!name) {
    return { success: false, message: 'Nama tidak boleh kosong.' };
  }

  let slug = createSlug(name);
  let isSlugUnique = false;
  let counter = 0;

  while (!isSlugUnique) {
    const newSlug = counter === 0 ? slug : `${slug}-${counter}`;
    const existing = await db`SELECT 1 FROM Guest WHERE slug = ${newSlug}`;
    if (existing.length === 0) {
      slug = newSlug;
      isSlugUnique = true;
    } else {
      counter++;
    }
  }

  try {
    await db`INSERT INTO Guest (name, slug) VALUES (${name}, ${slug})`;

    revalidatePath('/dashboard'); 

    return { success: true, message: `Tamu "${name}" berhasil ditambahkan.` };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Gagal menambahkan tamu ke database.' };
  }
}

export async function getGuests(): Promise<Guest[]> {
  try {
    const guests = await db`SELECT * FROM Guest ORDER BY created_at DESC`;
    const guest = guests as Guest[];
    return guest;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function addGuestbookEntry(
  prevState: RsvpFormState,
  formData: FormData
): Promise<RsvpFormState> {
  
  const name = formData.get('guestName') as string;
  const presence = formData.get('presence') as string;
  const message = formData.get('message') as string;
  const slug = formData.get('slug') as string;

  if (!name || !presence || !slug) {
    return { success: false, message: 'Nama dan Status Kehadiran wajib diisi.' };
  }
  
  if (presence === "Hadir" && !message) {

}

  try {

    await db`
      INSERT INTO GuestbookEntry (name, presence, message) 
      VALUES (${name}, ${presence}, ${message || ''})
    `;

    revalidatePath(`/invitation/${slug}`);
    
    return { success: true, message: 'Konfirmasi & ucapan Anda berhasil terkirim!' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Terjadi kesalahan saat mengirim ucapan.' };
  }
}

export async function getGuestbookEntries(limit?: number): Promise<GuestbookEntry[]> {
  try {
    const limitClause = limit ? db`LIMIT ${limit}` : db``;

    const entries = await db`
      SELECT * FROM GuestbookEntry 
      ORDER BY created_at DESC
      ${limitClause}
    `;
    
    return entries as GuestbookEntry[];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function deleteGuest(formData: FormData) {
  'use server'; 
  
  const guestId = formData.get('guestId') as string;

  if (!guestId) {
    console.error("Missing guestId");
    return; 
  }

  try {
    await db`DELETE FROM Guest WHERE id = ${guestId}`;
    
    revalidatePath('/dashboard');
    
  } catch (error) {
    console.error('Gagal menghapus tamu:', error);
  }
}

export async function deleteGuestbookEntry(formData: FormData) {
  'use server'; 

  const entryId = formData.get('entryId') as string;

  if (!entryId) {
    console.error("Missing entryId");
    return;
  }

  try {
    
    await db`DELETE FROM GuestbookEntry WHERE id = ${entryId}`;
        
    revalidatePath('/dashboard');
    
  } catch (error) {
    console.error('Gagal menghapus ucapan:', error);
  }
}