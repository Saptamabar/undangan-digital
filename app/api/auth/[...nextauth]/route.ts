// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // Nama yang akan ditampilkan di form login (opsional)
      name: 'Credentials',
      
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      
      async authorize(credentials) {
        // Logika untuk mengecek username dan password
        // Kita bandingkan dengan yang ada di .env.local
        if (
          credentials?.username === process.env.ADMIN_USERNAME &&
          credentials?.password === process.env.ADMIN_PASSWORD
        ) {
          // Jika cocok, kembalikan objek user
          // Objek ini akan disimpan di JWT
          return { id: "1", name: "Admin", email: "admin@example.com" }
        } else {
          // Jika tidak cocok, kembalikan null
          // Ini akan memicu error di halaman login
          return null
        }
      }
    })
  ],
  // Tentukan halaman login kustom kita
  pages: {
    signIn: '/login',
  },
  // Pastikan secret Anda dibaca dari .env
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }