import { NextComponentType } from "next";
import { signOut } from "next-auth/react";

export const Header: NextComponentType = ({user}) => {
    return (
        <header>
            <div>
                <img src={user.image} alt={user.name} />
                <p>{user.name}</p>
            </div>
            <button onClick={() => signOut()}>Sair</button>
        </header>
    )
}