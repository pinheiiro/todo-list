import { NextComponentType } from "next";
import Link from "next/link";
import { useSession, signIn, getSession } from "next-auth/react";
import { useEffect } from "react";
import router from 'next/router';

export const Main: NextComponentType = () => {
    /*
    useEffect(() => {
        getSession().
            then((res) => {
                console.log(res);
            })
    }, []);
    */
    
    const { data: session } = useSession();

    useEffect(() => {
        if(session) {
            router.push('/posts');
        }
    }, [session]);

    /*
    if(session) {
        router.push('/posts');
    }
    */
    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn("google")}>Sign in</button>
        </>
    )
}