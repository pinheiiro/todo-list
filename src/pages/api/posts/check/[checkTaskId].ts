import { NextApiRequest, NextApiResponse } from 'next';
import  '../../database/connect';
import Tasks from '../../database/models/tasks';

export default async function checkTask(req: NextApiRequest, res: NextApiResponse) {
    const { checkTaskId } = req.query;
    const { userId, completed } = req.body;
    try {
        const findTask = await Tasks.findOneAndUpdate({
            userId: userId
        }, {
            $set: {
                'tasks.$[t].completed': completed
            }
        }, {
            arrayFilters: [
                {
                    't._id': checkTaskId
                }
            ],
            new: true
        });
        if(!findTask) {
            res.status(404).json({error: 'Nenhuma task encontrada'});
        } else {
            res.json(findTask);
        }
    } catch(err) {
        res.status(500).end(err);
    }
}