import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useEffect } from "react";
import { api } from '../services/api';

export function Authenticate() {

    useEffect(() => {
        getSession().
            then((res) => {
                console.log(res);
            })
    }, []);

  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}