import { NextApiRequest, NextApiResponse } from 'next';
import '../../database/connect';
import Tasks from '../../database/models/tasks';

export default async function updatePost(req: NextApiRequest, res: NextApiResponse) {
    const { updatePostId } = req.query;
    const { text } = req.body;
    try {
        const findTask = Tasks.findByIdAndUpdate(updatePostId, {
            task: text
        });
        await findTask.exec();
        if(!findTask) {
            res.status(404).json({error: 'não foi encontrado nenhuma task'});
        } else {
            res.status(200).json({message: 'update realizado'});
        }
    } catch(err) {
        res.status(500).json(err);
    }
}