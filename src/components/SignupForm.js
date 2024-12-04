"use client"

import {useState} from 'react';
import { useRouter } from 'next/navigation'
import xss from 'xss'
 
export function SignupForm() {
  const router = useRouter()

  const [error, setError] = useState(null);
 
  async function handleSubmit(event) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)

    const username = xss(formData.get('username'))
    const email = xss(formData.get('email'))
    const password = xss(formData.get('password'))

 
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    })
 
    if (response.ok) {
      router.push('/login')
    } else {
        let err = await response.json()
        setError(err.error);
    }
  }
 
  return (
    <form onSubmit={handleSubmit}>

      <div className="m-5">
        <label htmlFor="username" className="mx-3 black">username</label>
        <input type="username" name="username" placeholder="Username" required />
      </div>


      <div className="m-5">
        <label htmlFor="email" className="mx-3 black">email</label>
        <input type="email" name="email" placeholder="Email" required />
      </div>


      <div className="m-5">
        <label htmlFor="password" className="mx-3">password</label>
        <input type="password" name="password" placeholder="Password" required />
      </div>

      <button type="submit">signup</button>

      {error && <p>{error}</p>}
    </form>
  )
}