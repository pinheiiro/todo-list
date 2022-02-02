import { getSession } from "next-auth/react"
import { db, clientPromise } from "../database/client";

clientPromise

export default async (req, res) => {
  const session = await getSession({ req })
  //console.log(session);
  const result = await db.collection("users").findOne({email: session.user.email})
  console.log(result)
  if(!session) {
      res.status(404).json({message: "Unautorized"});
  }
  res.status(200).json(result);
}