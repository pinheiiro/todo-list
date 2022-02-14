import { NextApiRequest, NextApiResponse } from 'next';
import  '../database/connect'; 
import Tasks from '../database/models/tasks';

export default async function allPosts(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = req.query;
    try {
        const findTasks = Tasks.find({userId: userId});
        const posts = await findTasks.exec();
        res.status(200).json(posts);
    } catch(err) {
        res.status(500).json({error: err});
    }
}