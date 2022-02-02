import { NextApiRequest, NextApiResponse } from 'next';
import  '../database/connect';
import Tasks from '../database/models/tasks';

export default async function newPost(req: NextApiRequest, res: NextApiResponse) {
    const { task, userId } = req.body;
    if(!task || !userId) {
        res.status(404).json({erro: 'propriedade indefinida'});
    }
    try {
        const newTask = new Tasks({ task, userId });
        await newTask.save();
        res.json(newTask);
    } catch(err) {
        console.log(err);
    }
}