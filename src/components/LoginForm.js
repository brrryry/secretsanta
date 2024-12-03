import Form from 'next/form';

export async function LoginForm() {
    return (
        <Form className="block">
            <div>
                <label className="m-3">username</label>
                <input name="username" />
            </div>
            
            <br />

            <div>
                <label className="m-3">password</label>
                <input name="password" />
            </div>

            <br />    

            <button type="submit" className="m-3">submit</button>
        </Form>
    )
}