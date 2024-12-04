"use client"

import {useState} from 'react';

import {CodeForm} from '@/components/CodeForm.js';
import {SignupForm} from '@/components/SignupForm.js';


export default function Signup() {
    const [lock, setLock] = useState(true);


    function callback() { //if this is called, code is valid.
        setLock(false);
    }


    return (
        <div>
            {lock && 
            <div>
                <p>wait! u need a code</p>
                <CodeForm callback={callback} />
            </div>
            }
            {!lock &&
            <div>
                <p>signup</p>
                <SignupForm />
            </div>
            }
        </div>
    )
}