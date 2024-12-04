"use client"

import {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation'
import Link from 'next/link'


export function Navbar() {
    const [loggedIn, setLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setLoggedIn(false);
        const auth = document.cookie.split(';').find(cookie => cookie.startsWith('auth='));
        if (auth && auth.length > 5) {
            setLoggedIn(true);
        }
    }, [])

    async function handleLogout(event) {
        event.preventDefault();

        document.cookie = 'auth=; path=/; max-age=0';
        setLoggedIn(false);
        router.push("/");
    }

    return (
        <nav className="bg-transparent flex justify-between items-center px-3 h-48 md:h-32">
      <div className="inline space-y-2 md:flex">
        <Link href="/" className="flex m-0 items-center">
          <p className="inline text-2xl text-purple-200 text-nowrap font-bold align-middle">
            ss2024.
          </p>
        </Link>
        <Link href="/" className="flex m-0 items-center md:hidden">
          <p className="inline text-2xl text-purple-200 text-nowrap font-bold align-middle">
            -- home
          </p>
        </Link>
        {loggedIn ? (
            <>
            <Link
          href="/sslist"
          className="flex m-0 items-center md:hidden"
        >
          <p className="inline text-2xl text-purple-200 text-nowrap font-bold align-middle">
            -- sslist
          </p>
        </Link>
            <Link href="/" onClick={handleLogout} className="flex m-0 items-center md:hidden">
                <p className="inline text-2xl text-purple-200 text-nowrap font-bold align-middle">
                    -- logout
                </p>
            </Link>
            </>
        ) : 
        (
            <Link href="/login" className="flex m-0 items-center md:hidden">
                <p className="inline text-2xl text-purple-200 text-nowrap font-bold align-middle">
                    -- login
                </p>
            </Link>
        )
        }
      </div>

      <ul className="space-x-6 hidden md:flex">
        <li>
          <Link href="/">
            <p className="text-2xl text-purple-200 font-bold">home</p>
          </Link>
        </li>
        {loggedIn ? (
            <>
            <li>
                <Link href="/sslist">
                <p className="text-2xl text-purple-200 font-bold">sslist</p>
                </Link>
            </li>
            <li>
                <Link href="/" onClick={handleLogout}>
                    <p className="text-2xl text-purple-200 font-bold">logout</p>
                </Link>
            </li>
            </>
        ) : 
        (
            <li>
                <Link href="/login">
                    <p className="text-2xl text-purple-200 font-bold">login</p>
                </Link>
            </li>
        )
        }
      </ul>
    </nav>
    )
}
