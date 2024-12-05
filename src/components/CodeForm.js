"use client"

import {useState} from 'react';
import xss from 'xss'

export function CodeForm({callback}) {

  const [error, setError] = useState(null);
 
  async function handleSubmit(event) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    
    const code = xss(formData.get('code'))

    const response = await fetch(process.env.SUB_URL + 'api/auth/code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    })
 
    if (response.ok) {
      setError("");
      callback();
    } else {
        let err = await response.json()
      setError(err.error);
    }

  }
 
  return (
    <form onSubmit={handleSubmit}>
      <div className="m-5">
        <label htmlFor="code" className="mx-3 black">code</label>
        <input type="code" name="code" placeholder="code" required />
      </div>

      <button type="submit">submit</button>

      {error && <p>{error}</p>}
    </form>
  )
}