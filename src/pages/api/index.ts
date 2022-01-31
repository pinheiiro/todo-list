import { NextApiRequest, NextApiResponse } from "next";
import Tasks from './database/schema/tasks';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { task } = req.body;
    const newTask = new Tasks({ task: task })
    const doc = await newTask.save();
    res.json(doc);
}