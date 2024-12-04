"use client"

import {useState} from 'react';
import { useRouter } from 'next/navigation'
import xss from 'xss' 

export function LoginForm() {
  const router = useRouter()

  const [error, setError] = useState(null);
 
  async function handleSubmit(event) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const username = xss(formData.get('username'))
    const password = xss(formData.get('password'))
 
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
 
    if (response.ok) {
      let data = await response.json();

      //set cookie
      document.cookie = `auth=${data.cookie}; path=/; max-age=60000;`;


      router.refresh();
    } else {
      let err = await response.json()
      setError(err.error);
    }
  }
 
  return (
    <form onSubmit={handleSubmit}>
      <div className="m-5">
        <label htmlFor="username" className="mx-3 black">username</label>
        <input type="username" name="username" placeholder="username" required />
      </div>


      <div className="m-5">
        <label htmlFor="password" className="mx-3">password</label>
        <input type="password" name="password" placeholder="password" required />
      </div>

      <button type="submit">login</button>

      {error && <p>{error}</p>}
    </form>
  )
}