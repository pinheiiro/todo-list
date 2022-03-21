import { NextApiRequest, NextApiResponse } from 'next';
import  '../../database/connect';
import Tasks from '../../database/models/tasks';

export default async function removePost(req: NextApiRequest, res: NextApiResponse) {
    const { removePostId } = req.query;
    const { userId } = req.body;

    const findPost = await Tasks.findOneAndUpdate({
        userId: userId
    }, {
        $pull: {
            tasks: {
                _id: removePostId
            }
        }
    }, {
        new: true
    });

    res.json(findPost);

}