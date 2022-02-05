import { NextApiRequest, NextApiResponse } from 'next';

export default async function updatePost(req: NextApiRequest, res: NextApiResponse) {
    const { updatePostId } = req.query;
    console.log(updatePostId);
}