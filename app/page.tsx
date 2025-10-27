"use client";

import { useState, useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { 
  BiPlayCircle, BiPauseCircle, BiEnvelopeOpen, BiCalendarHeart, BiHeart,
  BiTime, BiSolidGift, BiSolidBank, BiSolidPackage,BiLinkExternal, BiCopy
} from "react-icons/bi";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 data-aos="fade-up" className="font-heading text-5xl md:text-6xl text-center text-brand-dark">
    {children}
  </h2>
);

export default function WeddingPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showGiftInfo, setShowGiftInfo] = useState<'bank' | 'address' | null>(null);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      offset: 100,
    });
  }, []);

  useEffect(() => {
    const weddingDate = new Date("Dec 05, 2025 09:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;
      if (distance < 0) {
        clearInterval(interval); return;
      }
      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    audioRef.current?.play().catch(err => console.error("Audio play failed:", err));
    setIsPlaying(true);
  };
  
  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <main className="font-body text-brand-gray bg-brand-light">
      <audio ref={audioRef} src="/music.mp3" loop />
      
      {isOpen && (
        <button onClick={toggleMusic} className="fixed bottom-5 right-5 z-50 w-12 h-12 bg-gold/80 backdrop-blur-sm text-white rounded-full flex items-center justify-center text-2xl shadow-lg hover:bg-gold transition-all">
          {isPlaying ? <BiPauseCircle /> : <BiPlayCircle />}
        </button>
      )}

      <div className={`fixed top-0 left-0 w-full h-full hero-bg flex justify-center items-center z-50 transition-opacity duration-1000 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'} ` }>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative text-center text-white p-5 animate-fade-in">
          <h4 className="text-lg tracking-widest">The Wedding of</h4>
          <h1 className="font-heading text-6xl my-4">M & R</h1>
          <p className="mt-8">Kepada Yth. Bapak/Ibu/Saudara/i</p>
          <p className="font-bold text-lg">[Nama Tamu Undangan]</p>
          <button onClick={handleOpenInvitation} className="mt-8 inline-flex items-center gap-2 px-8 py-3 bg-gold text-white rounded-full hover:bg-opacity-80 transition-colors shadow-lg">
            <BiEnvelopeOpen /> Buka Undangan
          </button>
        </div>
      </div>

      <div className={`transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <header className="relative hero-bg h-screen flex items-center justify-center text-white text-center bg-fixed">
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 p-5 max-w-3xl mx-auto">
              <h4 data-aos="fade-down" className="tracking-widest">
                  THE WEDDING OF
              </h4>
              <h1 data-aos="zoom-in" data-aos-delay="200" className="font-heading text-7xl md:text-8xl my-4">
                  Marisa <br />& <br /> Rivaldi
              </h1>
              <p data-aos="fade-up" data-aos-delay="400" className="text-xl">
                  Jumat, 05 Desember 2025
              </p>              
          </div>
      </header>

        <section className="py-20 px-5 bg-gray-50/50">
            <div data-aos="fade-up" className="max-w-3xl mx-auto text-center italic">
                <p className="text-xl md:text-2xl leading-relaxed">"Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."</p>
                <h4 className="font-heading text-2xl mt-6">- QS. Ar-Rum: 21 -</h4>
            </div>
        </section>

        {/* ✅ PERUBAHAN: Menghilangkan foto dan fokus pada teks */}
        <section className="py-20 px-5 overflow-hidden relative">
            <div className="absolute inset-0 bg-white/80 z-0"></div>
            <div className="relative z-10">
                <h1 data-aos="fade-up" className='font-heading text-4xl md:text-5xl text-center text-brand-dark'>Assalamualaikum wr. wb</h1>
                <p data-aos="fade-up" className="text-center max-w-2xl mx-auto mt-4 mb-16">
                    Dengan Memohon Rahmat dan Ridho Allah Subhanahu Wa Ta'ala. Kami Mengundang Bapak/Ibu Saudara/i, 
                    Untuk Menghadiri Resepsi Pernikahan Putra dan Putri Kami
                </p>
                <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
                    
                    {/* --- Mempelai Wanita --- */}
                    <div data-aos="fade-right" className="text-center">
                        {/* FOTO DIHAPUS DARI SINI */}
                        <h3 className="font-heading text-4xl">Marisa Prima Putri</h3>
                        <p className="mt-2 text-lg max-w-xs mx-auto">
                            Putri Pertama dari Alm. Bapak Priyo Prayogi dan Ibu Fatmawati
                        </p>
                    </div>

                    <div data-aos="zoom-in" data-aos-delay="300" className="font-heading text-7xl text-gold">&</div>
                    
                    {/* --- Mempelai Pria --- */}
                    <div data-aos="fade-left" className="text-center">
                        {/* FOTO DIHAPUS DARI SINI */}
                        <h3 className="font-heading text-4xl">M. Trisda Rivaldi</h3>
                        <p className="mt-2 text-lg max-w-xs mx-auto">
                            Putra Pertama dari Bapak Trisno Budi dan Alm. Ibu Ida Irma Suryani
                        </p>
                    </div>
                    
                </div>
            </div>
        </section>

        {/* ✅ SECTION BARU: Countdown Timer */}
        <section className="relative py-20 px-5 hero-bg text-white text-center bg-fixed">
          <div className="absolute inset-0 bg-black/60 z-0"></div>
          <div className="relative z-10">
              <h2 data-aos="fade-up" className="font-heading text-5xl md:text-6xl tracking-tight">
                  Menghitung Hari
              </h2>

              <div data-aos="fade-up" data-aos-delay="200" className="flex justify-center gap-4 md:gap-8 mt-12">
                  {Object.entries(countdown).map(([unit, value]) => (
                      <div key={unit} className="text-center">
                          <span className="block font-heading text-6xl md:text-7xl">
                              {String(value).padStart(2, '0')}
                          </span>
                          <span className="capitalize text-sm tracking-widest">{unit}</span>
                      </div>
                  ))}
              </div>

              <button 
                  data-aos="fade-up" 
                  data-aos-delay="400" 
                  className="mt-12 px-8 py-3 bg-gold text-white rounded-full hover:bg-opacity-80 transition-colors shadow-lg"
              >
                  Simpan Tanggal
              </button>
          </div>
        </section>

        <section className="py-24 px-5 bg-cover bg-center" style={{ backgroundImage: "url('/bg-senja.jpg')" }}>
            <div data-aos="zoom-in-up" className="max-w-xl mx-auto bg-white/90 backdrop-blur-sm shadow-2xl 
              rounded-tl-[150px] rounded-tr-[150px] rounded-b-2xl overflow-hidden text-center p-8 md:p-12">
              
              {/* --- Bagian Akad Nikah --- */}
              <div className="mb-10">
                <h3 className="font-heading text-4xl text-brand-dark">Akad Nikah</h3>
                
                {/* ✅ PERUBAHAN DI SINI: Format tanggal diubah menjadi satu baris */}
                <p className="my-6 flex items-center justify-center gap-3">                   
                    <span className="font-semibold text-lg text-brand-dark">Jumat, 05 Desember 2025</span>
                </p>
                
                <p className="flex items-center justify-center gap-3 mb-4"><BiTime className="text-gold text-xl"/> 08:00 WIB - Selesai</p>
                <p className="font-semibold">Kediaman Mempelai Wanita</p>
                <p className="text-sm px-4">
                    Jl. Gajah Mada XXIV No. 240 Kaliwates Jember Jawa Timur
                </p>
                <a 
                    href="https://maps.app.goo.gl/ndw7iU3xA4ZzezCn6"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 px-5 py-2 bg-gold text-white text-sm rounded-full hover:bg-opacity-80 transition-colors shadow"
                >
                    <BiLinkExternal />
                    Lihat Lokasi
                </a>
              </div>

              {/* --- Pemisah --- */}
              <hr className="w-1/2 mx-auto border-gold/30 my-8"/>

              {/* --- Bagian Resepsi --- */}
              <div>
                <h3 className="font-heading text-4xl text-brand-dark">Resepsi</h3>

                {/* ✅ PERUBAHAN DI SINI: Format tanggal diubah menjadi satu baris */}
                <p className="my-6 flex items-center justify-center gap-3">
                    <span className="font-semibold text-lg text-brand-dark">Jumat, 05 Desember 2025</span>
                </p>

                <p className="flex items-center justify-center gap-3 mb-4"><BiTime className="text-gold text-xl"/> 16:00 - 20:00 WIB</p>
                <p className="font-semibold">Kediaman Mempelai Wanita</p>
                <p className="text-sm px-4">
                    Jl. Gajah Mada XXIV No. 240 Kaliwates Jember Jawa Timur
                </p>
                <a 
                    href="https://maps.app.goo.gl/ndw7iU3xA4ZzezCn6"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 px-5 py-2 bg-gold text-white text-sm rounded-full hover:bg-opacity-80 transition-colors shadow"
                >
                    <BiLinkExternal />
                    Lihat Lokasi
                </a>
              </div>
            </div>
        </section>
                    

        <section className="py-20 px-5 text-center">
          <div className="max-w-3xl mx-auto">
              <BiSolidGift data-aos="zoom-in" className="text-gold text-7xl mx-auto mb-4" />
              <SectionTitle>Wedding Gift</SectionTitle>
              <p data-aos="fade-up" className="mt-4 text-lg max-w-2xl mx-auto">Doa restu Anda adalah hadiah terindah. Namun jika ingin memberikan tanda kasih, kami dengan senang hati menerimanya.</p>
              
              <div data-aos="fade-up" data-aos-delay="200" className="flex justify-center gap-4 mt-8">
                  <button onClick={() => setShowGiftInfo(showGiftInfo === 'bank' ? null : 'bank')} className="px-6 py-3 bg-black text-white rounded-full inline-flex items-center gap-2 hover:bg-opacity-80 transition-colors">
                      <BiSolidBank /> Kirim Amplop
                  </button>
                  <button onClick={() => setShowGiftInfo(showGiftInfo === 'address' ? null : 'address')} className="px-6 py-3 bg-brand-chocolate text-white rounded-full inline-flex items-center gap-2 hover:bg-opacity-80 transition-colors">
                      <BiSolidPackage /> Kirim Kado
                  </button>
              </div>

              {/* ✅ PERUBAHAN DIMULAI DI SINI */}
              {showGiftInfo === 'bank' && (
                  <div data-aos="fade-up" className="mt-8 p-6 bg-gray-100 rounded-lg max-w-sm mx-auto space-y-4">
                      
                      {/* --- Rekening Bank Mandiri --- */}
                      <div className="text-left p-4 border rounded-md bg-white">
                          {/* Logo dan Nama Bank */}
                          <div className="flex items-center gap-3">
                              <img 
                                  src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg" 
                                  alt="Logo Bank Mandiri" 
                                  className="h-4"
                              />
                          </div>
                          
                          {/* Detail Rekening */}
                          <p className="text-gray-700 mt-3">1430028223343</p>
                          <p className="text-gray-600 text-sm">a.n Mohammad Trisda Rivaldi</p>
                          <button onClick={() => navigator.clipboard.writeText('1430028223343')} className="mt-2 text-sm text-gold inline-flex items-center gap-1 font-medium">
                              <BiCopy /> Salin No. Rekening
                          </button>
                      </div>

                      {/* --- Rekening Bank BRI --- */}
                      <div className="text-left p-4 border rounded-md bg-white">
                          {/* Logo dan Nama Bank */}
                          <div className="flex items-center gap-3">
                              <img 
                                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/BANK_BRI_logo.svg/2560px-BANK_BRI_logo.svg.png" 
                                  alt="Logo Bank BRI" 
                                  className="h-5"
                              />
                          </div>
                          
                          {/* Detail Rekening */}
                          <p className="text-gray-700 mt-3">220301007739501</p>
                          <p className="text-gray-600 text-sm">a.n Marisa Prima Putri</p>
                          <button onClick={() => navigator.clipboard.writeText('220301007739501')} className="mt-2 text-sm text-gold inline-flex items-center gap-1 font-medium">
                              <BiCopy /> Salin No. Rekening
                          </button>
                      </div>
                  </div>
              )}

              {showGiftInfo === 'address' && (
                  <div data-aos="fade-up" className="mt-8 p-6 bg-gray-100 rounded-lg max-w-sm mx-auto">
                      <h4 className="font-heading text-xl">Alamat Pengiriman</h4>
                      <p className="mt-2">
                          Jl. Gajah Mada XXIV No. 240 Kaliwates Jember Jawa Timur
                      </p>
                      <p className="text-sm text-gray-600 mt-1">a/n Marisa & Rivaldi</p>
                  </div>
              )}
              {/* ✅ PERUBAHAN SELESAI DI SINI */}
          </div>
      </section>

        {/* ✅ SECTION: LOKASI */}
        <section className="py-20 px-5 bg-white">
            <SectionTitle>Lokasi Acara</SectionTitle>
            <p data-aos="fade-up" className="text-center mt-4 text-lg">Kami menantikan kehadiran Anda di hari bahagia kami.</p>

            <div data-aos="zoom-in-up" className="max-w-3xl mx-auto mt-10 rounded-xl overflow-hidden shadow-xl border border-gold/20">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3949.2093002678507!2d113.67000307500926!3d-8.181658991849693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOMKwMTAnNTQuMCJTIDExM8KwNDAnMjEuMyJF!5e0!3m2!1sid!2sid!4v1761397135149!5m2!1sid!2sid"
                    width="100%"
                    height="350"
                    className="border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>

            <div className="flex justify-center mt-6">
                <a
                    href="https://maps.app.goo.gl/ndw7iU3xA4ZzezCn6"
                    target="_blank"
                    className="px-8 py-3 bg-gold text-white rounded-full shadow-lg hover:bg-opacity-80 transition-colors"
                >
                    Buka di Google Maps
                </a>
            </div>
        </section>

        {/* ✅ SECTION GABUNGAN: Buku Tamu & RSVP */}
        <section className="py-20 px-5 relative">
            <div className="absolute inset-0 bg-white/85 z-0"></div>
            <div className="relative z-10 max-w-3xl mx-auto text-center">
                <SectionTitle>Buku Tamu & RSVP</SectionTitle>
                <p data-aos="fade-up" className="mt-4 max-w-lg mx-auto">
                    Mohon konfirmasi kehadiran Anda dan berikan doa restu untuk kami di hari bahagia nanti.
                </p>

                {/* --- Form Gabungan --- */}
                <form data-aos="fade-up" className="mt-10 max-w-lg mx-auto text-left grid gap-4">
                    
                    {/* Input Nama */}
                    <input 
                        type="text" 
                        placeholder="Nama Anda"
                        className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold outline-none placeholder:text-gray-400"
                    />
                    
                    {/* Pilihan Kehadiran */}              
                    <select 
                        className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold outline-none"
                        defaultValue="" // <-- Add this
                    >
                        <option value="" disabled>Status Kehadiran</option> {/* <-- Removed 'selected' */}
                        <option value="Hadir">Hadir</option>
                        <option value="Belum Pasti">Belum Pasti</option>
                        <option value="Tidak Hadir">Tidak Hadir</option>
                    </select>

                    {/* Input Ucapan & Doa */}
                    <textarea 
                        placeholder="Tuliskan ucapan & doa Anda..."
                        rows={4}
                        className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold outline-none placeholder:text-gray-400"
                    ></textarea>
                    
                    {/* Tombol Submit */}
                    <button 
                        type="submit"
                        className="mt-2 w-full px-6 py-3 bg-brand-dark text-white rounded-full hover:bg-opacity-80 transition-colors"
                    >
                        Kirim Konfirmasi & Ucapan
                    </button>
                </form>

                {/* --- Daftar Ucapan yang Tampil --- */}
                <div className="mt-16 text-left" data-aos="fade-up" data-aos-delay="300">
                    <h3 className="font-heading text-2xl text-brand-dark mb-6 text-center">Ucapan dari Tamu</h3>
                    <div className="grid gap-6">
                        {/* Dummy pesan contoh */}
                        {["Selamat berbahagia!", "Doa terbaik untuk kalian!", "Semoga langgeng sampai akhir hayat ❤️"].map((msg, i) => (
                            <div key={i} className="p-4 rounded-lg bg-white shadow-md border-l-4 border-gold">
                                <p className="font-medium">Tamu Undangan {i+1}</p>
                                <p className="text-gray-600 mt-1">{msg}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        <footer 
          // ✅ PERUBAHAN UTAMA ADA DI BARIS INI
          className="relative h-screen hero-2-bg bg-fixed flex items-center justify-center px-5 text-center text-white/90" 
        >
          <div className="absolute inset-0 bg-black/70 z-0"></div>
          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            
            <h2 data-aos="fade-up" className="font-heading text-5xl">
              Terima Kasih
            </h2>

            <p data-aos="fade-up" data-aos-delay="200" className="mt-4 max-w-xl mx-auto text-white/80">
              Merupakan suatu kehormatan dan kebahagiaan bagi kami atas kehadiran serta doa restu yang Anda berikan.
            </p>

            {/* --- Inisial & Tanggal --- */}
            <div data-aos="fade-up" data-aos-delay="400" className="mt-12">
              <h3 className="font-heading text-4xl tracking-widest flex items-center gap-4">
                M <div data-aos="zoom-in" data-aos-delay="300" className="font-heading text-4xl text-gold">&</div> R
              </h3>
              <p className="mt-2 text-sm opacity-80">
                05 DESEMBER 2025
              </p>
            </div>
            
            {/* --- Credit Vendor --- */}
            <div data-aos="fade-up" data-aos-delay="600" className="mt-16 text-xs text-white/60">
              <p>Made by</p>
              {/* Ganti href dan nama vendor sesuai kebutuhan */}
              <a 
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:text-white transition-colors duration-300"
              >
                SevenDigiSoulution
              </a>
            </div>

          </div>
        </footer>
      </div>
    </main>
  );
}