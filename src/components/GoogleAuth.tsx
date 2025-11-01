import { useState } from 'react'
import { GoogleLogin, googleLogout, useGoogleOneTapLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import type { CredentialResponse } from '@react-oauth/google'

interface GoogleUser {
  email: string
  name: string
  picture: string
  sub: string
}

interface GoogleAuthProps {
  onUserChange?: (user: GoogleUser | null) => void
}

export function GoogleAuth({ onUserChange }: GoogleAuthProps) {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

  if (!googleClientId) {
    return null
  }

  return <GoogleAuthContent onUserChange={onUserChange} />
}

function GoogleAuthContent({ onUserChange }: GoogleAuthProps) {
  const [user, setUser] = useState<GoogleUser | null>(null)

  const handleLoginSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const decoded = jwtDecode<GoogleUser>(credentialResponse.credential)
      setUser(decoded)
      onUserChange?.(decoded)
    }
  }

  const handleLoginError = () => {
    console.error('Google Sign-In failed')
  }

  const handleLogout = () => {
    googleLogout()
    setUser(null)
    onUserChange?.(null)
  }

  useGoogleOneTapLogin({
    onSuccess: handleLoginSuccess,
    onError: handleLoginError,
    disabled: !!user,
  })

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2">
          <img
            src={user.picture}
            alt={user.name}
            className="w-8 h-8 rounded-full border-2 border-saffron-500"
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {user.name}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          Sign Out
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center">
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
        theme="outline"
        size="medium"
        shape="rectangular"
        text="signin"
      />
    </div>
  )
}
