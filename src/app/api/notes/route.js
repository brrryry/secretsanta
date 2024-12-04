import { updateNotes } from "@/lib/data";

export async function POST(req, res) {

    try {
        const {username, notes} = await req.json();
        await updateNotes(username, notes);
    
        return Response.json({ success: true }, { status: 200 });
    } catch (error) {
        return Response.json({ error: error.error }, { status: error.status });
    }
}