"use client"

import {useState} from 'react';
import { useRouter } from 'next/navigation'
 
export function LoginForm() {
  const router = useRouter()

  const [error, setError] = useState(null);
 
  async function handleSubmit(event) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
 
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
 
    if (response.ok) {
      router.push('/profile')
    } else {
      setError('Login failed');
    }
  }
 
  return (
    <form onSubmit={handleSubmit}>
      <div className="m-5">
        <label htmlFor="email" className="mx-3 black">email</label>
        <input type="email" name="email" placeholder="Email" required />
      </div>


      <div className="m-5">
        <label htmlFor="password" className="mx-3">password</label>
        <input type="password" name="password" placeholder="Password" required />
      </div>

      <button type="submit">Login</button>

      {error && <p>{error}</p>}
    </form>
  )
}