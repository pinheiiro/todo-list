import { NextApiRequest, NextApiResponse } from 'next';
import  '../database/connect';
import Tasks from '../database/models/tasks';

export default async function newPost(req: NextApiRequest, res: NextApiResponse) {
    const { userId, task } = req.body;
    if(!userId || !task) {
        res.status(404).json({erro: 'propriedade indefinida'});
    }
    try {
        const newTask = await Tasks.findOneAndUpdate({
            userId: userId
        }, {
            $push: {
                tasks: {
                    task: task
                }
            }
        }, {
            new: true
        });
        
        res.json(newTask);

    } catch(err) {
        console.log(err);
    }
}