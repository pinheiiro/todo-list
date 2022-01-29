import { NextApiRequest, NextApiResponse } from "next";
import { useSession } from "next-auth/react";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { data: session, status } = useSession();
    console.log(session);
    res.status(200).json({name: "Gabriel Pinheiro"});
}