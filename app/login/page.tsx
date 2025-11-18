// app/login/page.tsx

'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('') // Hapus error sebelumnya

    try {
      // Coba login menggunakan provider 'credentials'
      const result = await signIn('credentials', {
        redirect: false, // Jangan redirect otomatis, kita tangani manual
        username,
        password,
      })

      if (result?.ok) {
        // Login berhasil, arahkan ke dashboard
        router.push('/dashboard')
      } else {
        // Login gagal, tampilkan pesan error
        setError('Username atau Password salah!')
      }
    } catch (err) {
      setError('Terjadi kesalahan saat login.')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
        className="p-8 bg-white rounded-lg shadow-md w-full max-w-sm"
      >
        <h1 className="text-3xl font-heading text-brand-dark mb-6 text-center">
          Admin Login
        </h1>
        
        {error && (
          <p className="mb-4 text-center text-red-600 bg-red-100 p-2 rounded">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label 
            htmlFor="username" 
            className="block mb-2 font-medium text-brand-gray"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold outline-none"
          />
        </div>

        <div className="mb-6">
          <label 
            htmlFor="password" 
            className="block mb-2 font-medium text-brand-gray"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold outline-none"
          />
        </div>

        <button 
          type="submit" 
          className="w-full py-3 bg-brand-dark text-white rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  )
}