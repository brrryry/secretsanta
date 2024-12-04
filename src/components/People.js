"use client"

import {useState, useEffect} from 'react';
import Link from 'next/link';

export function People({username, admin, session}) {

    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reply, setReply] = useState("");


    function startSecretSanta() {
        fetch('/api/sslist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, session})
        }).then(res => res.json())
        .then(data => {
            if(data.error) {
                setReply(data.error);
                return;
            } else {
                setReply(data.message);
                window.location.href = "./";
            }
        });
    }

    useEffect(() => {
        async function getPeople() {
            const res = await fetch('/api/user', {
                method: 'GET',
                headers: {
                    'User': username,
                    'Session': session
                }
            });

            const data = await res.json();
            

            setPeople(data);
            setLoading(false);
        }
        getPeople();
    }, []);

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <p>ppl in secret santa</p>
            <ul>
                {people.map(person => (
                    <li key={person.username}>
                        <Link href={`/profile/${person.username}`}>{person.username} ({person.email})</Link>
                    </li>
                ))}
            </ul>

            {username === admin && 
                <>
                <button onClick={startSecretSanta}>start secret santa</button>
                <p>{reply}</p>
                </>
            }
        </div>
    )


}