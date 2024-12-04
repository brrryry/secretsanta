import {headers} from 'next/headers';
import { NotesForm } from '@/components/NotesForm';

export default async function Profile({params}) {

    const username = (await params).username;

    const h = await headers();

    const user = h.get("User");
    const session = h.get("Session");

    return (
        <NotesForm username={user} targetUser = {username} session={session}/>
    )
}

