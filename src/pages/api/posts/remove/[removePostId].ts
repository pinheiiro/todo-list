import { NextApiRequest, NextApiResponse } from 'next';
import  '../../database/connect';
import Tasks from '../../database/models/tasks';

export default async function removePost(req: NextApiRequest, res: NextApiResponse) {
    const { removePostId } = req.query;
    const findPost = Tasks.findByIdAndRemove(removePostId);
    await findPost.exec();
    res.end(removePostId);
}