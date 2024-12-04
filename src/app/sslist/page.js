import {headers} from 'next/headers';
import { People } from '@/components/People';

export default async function Profile() {

    const h = await headers();

    const username = h.get("User");
    const session = h.get("Session");

    return (
        <People username={username} admin={process.env.ADMIN_USER} session={session}/>
    )
}

