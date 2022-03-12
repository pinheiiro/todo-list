import { NextComponentType } from "next";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import router from 'next/router';

import { Button } from '@chakra-ui/react';

export const Main: NextComponentType = () => {
    
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
            <Button colorScheme='whatsapp' onClick={() => signIn("google")}>Sign in</Button>
        </>
    )
}