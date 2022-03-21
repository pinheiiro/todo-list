import { NextApiRequest, NextApiResponse } from 'next';
import  '../database/connect'; 
import Tasks from '../database/models/tasks';

export default async function allPosts(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = req.query;
    try {
        const findTasks = await Tasks.find({userId: userId});
        res.status(200).json(findTasks);
    } catch(err) {
        res.status(500).json({error: err});
    }
}