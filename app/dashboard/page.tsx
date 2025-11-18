import { getGuests, getGuestbookEntries } from '@/app/actions'; 
import { GuestForm } from './GuestForm';
import { DeleteGuestButton, DeleteGuestbookEntryButton } from './DeleteButtons';
import { LogoutButton } from './LogoutButton';

export default async function DashboardPage() {
  
  const [guests, guestbookEntries] = await Promise.all([
    getGuests(),
    getGuestbookEntries()
  ]);

  return (
    <div className="max-w-4xl mx-auto p-8">
     
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-heading text-brand-dark">
          Dashboard Undangan
        </h1>
        <LogoutButton />
      </div>

      {/* Bagian Form Tamu */}
      <div className="mb-12 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Tambah Tamu Baru</h2>
        <GuestForm />
      </div>

      {/* Bagian Daftar Tamu */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Daftar Tamu ({guests.length})</h2>
        <div className="space-y-4">
          {guests.length === 0 ? (
            <p>Belum ada tamu yang ditambahkan.</p>
          ) : (
            guests.map((guest) => (
              <div key={guest.id} className="flex justify-between items-center p-4 bg-white rounded-lg shadow">
                <div>
                  <p className="font-semibold text-lg">{guest.name}</p>
                  <p className="text-sm text-gray-600">
                    Link: /invitation/{guest.slug}
                  </p>
                </div>
                
                {/* ✅ 2. KELOMPOKKAN TOMBOL */}
                <div className="flex items-center gap-2">
                   <a 
                      href={`/invitation/${guest.slug}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-3 py-1 text-sm bg-gold text-white rounded-lg"
                    >
                      Lihat
                    </a>
                    {/* TAMBAHKAN TOMBOL HAPUS TAMU DI SINI */}
                    <DeleteGuestButton guestId={guest.id} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bagian Daftar Ucapan */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Daftar Ucapan ({guestbookEntries.length})</h2>
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {guestbookEntries.length === 0 ? (
            <p>Belum ada ucapan yang masuk.</p>
          ) : (
            guestbookEntries.map((entry) => (
              <div key={entry.id} className="p-4 bg-white rounded-lg shadow">
                {/* ... (Info nama dan status kehadiran) ... */}
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-lg">{entry.name}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    entry.presence === 'Hadir' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {entry.presence}
                  </span>
                </div>
                
                <p className="text-gray-600 mt-1 italic">
                  "{entry.message || '...'}"
                </p>
                
                {/* ✅ 3. ATUR TATA LETAK INFO BAWAH */}
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-400">
                    {new Date(entry.created_at).toLocaleString('id-ID')}
                  </p>
                  {/* TAMBAHKAN TOMBOL HAPUS UCAPAN DI SINI */}
                  <DeleteGuestbookEntryButton entryId={entry.id} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>  
  );
}