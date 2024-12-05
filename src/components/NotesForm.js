"use client"

import {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation'
import xss from 'xss'
 
export function NotesForm({username, targetUser, session}) {
  const router = useRouter()

  const [error, setError] = useState(null);
  const [notes, setNotes] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${process.env.SUB_URL}api/user/${targetUser}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', username, session },
      })
      if (response.ok) {
        let data = await response.json();
        setEmail(data.email);
        setNotes(data.notes);
      } else {
        let err = await response.json()
        setError(err.error);
      }
    }
    fetchData();
  }, [])
 
  async function handleSubmit(event) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const notes = xss(formData.get('notes'))

    const response = await fetch(process.env.SUB_URL + 'api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', username, session },
      body: JSON.stringify({ username , notes }),
    })
 
    if (response.ok) {
      setNotes(notes);
      setError("");
      //clear form field
      document.getElementById("notes").value = "";
    } else {
      let err = await response.json()
      setError(err.error);
    }
  }
 
  return (
    <div>
        <p>user: {targetUser}</p>
        <p>email: {email}</p>
        <p className="mt-5 underline">notes:</p>
        {notes ? (
          <>
            {notes.split("\n").map((note, index) => (
              <p key={index}>{note}</p>
            ))}

          </>
        ) : <p>nothing for now D:</p>}

        <br />
    {targetUser == username && 
        <div>
        <p>wanna update your notes? (u can make it a multiline thing)</p>
        <form onSubmit={handleSubmit}>
            <div className="my-5 mr-5">
            <textarea type="notes" name="notes" id="notes" placeholder="new notes!" className="w-1/5 h-64" required />
            </div>


            <button type="submit">submit notes</button>

            {error && <p>{error}</p>}
        </form>
        </div>
    }
    </div>

  )
}