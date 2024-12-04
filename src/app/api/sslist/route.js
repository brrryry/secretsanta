import { getUsers } from "@/lib/data";
import nodemailer from 'nodemailer';

export async function POST(req, res) {

    const newreq = await req.json();

    const {username} = await newreq;


    if(username !== process.env.ADMIN_USER) {
        return Response.json({error: "Unauthorized"}, {status: 401})
    }

    const userData = await getUsers();

    //shuffle users for secret santa
    let shuffledUsers = [...userData];
    for (let i = shuffledUsers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledUsers[i], shuffledUsers[j]] = [shuffledUsers[j], shuffledUsers[i]];
    }

    //append first user to the end of the list
    shuffledUsers.push(shuffledUsers[0]);


    //using nodemailer to send emails, hostway mail 
    let transporter = nodemailer.createTransport({
        host: '64.26.60.225',
        port: 587,
        tls: {
            rejectUnauthorized: false
        },
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    transporter.verify(function(error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("Server is ready to take our messages");
        }
    });

    
    try {
        //loop through list and send emails
        for (let i = 0; i < shuffledUsers.length - 1; i++) {
            let mailOptions = {
                from: process.env.EMAIL_ADDRESS,
                to: shuffledUsers[i].email,
                replyTo: process.env.EMAIL_ADDRESS,
                subject: 'secret santa assignment (from branbot)',
                html: `
                    <div>
                    <h1>heyyyyyy ` + shuffledUsers[i].username + ` (what a weird name)</h1>
                    <p>your secret santa is ` + shuffledUsers[i + 1].username + `. their email is ` + shuffledUsers[i].email + `. 
                    <br />
                    feel free to check out their profile to get an idea of what they like...?
                    <a href=` + `${process.env.WEBSITE_URL}/profile/${shuffledUsers[i+1].username}` + `>here</a>
                    <br />
                    <br />
                    aight peace out 
                    <br />
                    - bryan (the guy who made this) (this is botted btw so uh dont respond hehe)
                    </p>
                </div>`
                
            };

            await transporter.sendMail(mailOptions);
        }

        return Response.json({message: "emails sent!"}, {status: 200})
    } catch(error) {
        console.log(error);
        return Response.json({error: "something weird happened..."}, {status: 500})
    }
        
}