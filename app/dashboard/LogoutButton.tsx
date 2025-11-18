// app/dashboard/LogoutButton.tsx

'use client'

import { signOut } from 'next-auth/react'

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })} // Arahkan ke Home setelah logout
      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
    >
      Logout
    </button>
  )
}