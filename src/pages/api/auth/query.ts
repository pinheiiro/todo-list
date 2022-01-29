import { getSession } from "next-auth/react"

export default async (req, res) => {
  const session = await getSession({ req })
  console.log(session);
  if(!session) {
      res.status(404).json({message: "Unautorized"});
  }
  res.status(200).json(session);
}