"use client"

export default function Home() {
  return (
    <div className="space-y-5">
      <br />
      <p>hi, im <a href="https://bryanchan.org" target="_blank">bryan.</a></p>
      <p>this is my secret santa website. i made this for some friends on a whim.</p>
      <p>i used sqlite 4 database (i aint dealing with no remote connections lol)</p>

      <br />
      <p>wanna login? <a href="/login">login</a></p>
      <p>wanna sign up? <a href="/signup">signup</a></p>

      <p>thats it, thanx :)</p>
    </div>
  );
}
