import { _id } from '@next-auth/mongodb-adapter';
import { NextApiRequest, NextApiResponse } from 'next';
import '../../database/connect';
import Tasks from '../../database/models/tasks';

export default async function updatePost(req: NextApiRequest, res: NextApiResponse) {
    const { updatePostId } = req.query;
    const { userId, text } = req.body;
    try {
        const findTask = await Tasks.findOneAndUpdate({
            userId: userId
        }, {
            $set: {
                'tasks.$[t].task': text
            }
        }, {
            arrayFilters: [
                {
                    't._id': updatePostId
                }
            ],
            new: true
        });
        res.json(findTask);
    } catch(err) {
        res.status(500).json(err);
    }
}