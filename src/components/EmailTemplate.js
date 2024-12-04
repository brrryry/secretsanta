

export const EmailTemplate = ({sender, receiver, receiverEmail}) => {

    return (
        <div>
            <h1>heyyyyyy {sender} (what a weird name)</h1>
            <p>your secret santa is {receiver}. their email is {receiveremail}. 
            <br />
            feel free to check out their profile to get an idea of what they like...?
            <a href={`/profile/${receiver}`}>here</a>
            <br />
            <br />
            aight peace out 
            <br />
            - bryan (the guy who made this) (this is botted btw so uh dont respond hehe)
            </p>
        </div>
    )
}