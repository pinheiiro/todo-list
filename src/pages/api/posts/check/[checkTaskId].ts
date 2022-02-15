import { NextApiRequest, NextApiResponse } from 'next';
import  '../../database/connect';
import Tasks from '../../database/models/tasks';

export default async function checkTask(req: NextApiRequest, res: NextApiResponse) {
    const { checkTaskId } = req.query;
    const { completed } = req.body;
    try {
        const findTask = Tasks.findByIdAndUpdate(checkTaskId, {
            completed: completed
        })
        await findTask.exec();
        if(!findTask) {
            res.status(404).json({error: 'Nenhuma task encontrada'});
        } else {
            res.end('Alteração realizada');
        }
    } catch(err) {
        res.status(500).end(err);
    }
}