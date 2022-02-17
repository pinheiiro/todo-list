import { NextComponentType } from "next";
import { useState, BaseSyntheticEvent } from "react";
import { api } from "../../../services/api";
import { useMutation, useQueryClient } from 'react-query';

interface INewTask {
    text: String,
    userId: String
}

interface IUpdateTask {
    taskId: String,
    newText: String
}

interface IOnCheck {
    id: String,
    check: Boolean
}

export const List: NextComponentType = ({user, data}) => {

    const [newPost, setNewPost] = useState <Boolean> (false);
    const [updatePost, setUpdatePost] = useState <Boolean> (false);
    const [text, setText] = useState <String> ('');
    const [updateId, setUpdateId] = useState <null | String> (null);

    const queryClient = useQueryClient();
    
    const createTask = useMutation(async ({text, userId}: INewTask) => {
        const res = await api.post('posts/new', {
            task: text,
            userId: userId
        });
        return res.data;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('tasks');
        }
    });

    const checkTask = useMutation(async ({id, check}: IOnCheck) => {
        if(check) {
            await api.patch(`/posts/check/${id}`, {
                completed: true
            })
        } else {
            await api.patch(`/posts/check/${id}`, {
                completed: false
            })
        }
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('tasks');
        }
    });

    const updateTasks = useMutation(async ({taskId, newText}: IUpdateTask) => {
        await api.patch(`/posts/update/${taskId}`, {
            text: newText
        });
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('tasks');
        }
    });

    const removeTasks = useMutation(async (id) => {
        await api.delete(`/posts/remove/${id}`);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('tasks');
        }
    })

    function assignment({target}: BaseSyntheticEvent): void {
        const { value } = target;
        setText(value);
    }

    function add(): void {
        setUpdatePost(false);
        setText('');
        setNewPost(true);
    }

    function cancel(state: Boolean): void {
        if(newPost === state) {
            setNewPost(false);
        }
        else if(updatePost === state) {
            setUpdatePost(false);
        }
    }

    async function newTasks(event: BaseSyntheticEvent): Promise<void> {
        event.preventDefault();
        const newTask: INewTask = {
            text: text,
            userId: user._id
        }
        await createTask.mutateAsync(newTask);
        setText('');
        setNewPost(false);
    }

    async function check({target}: BaseSyntheticEvent): void {
        const onCheck: IOnCheck = {
            id: target.value,
            check: target.checked
        }

        if(onCheck.check) {
            await checkTask.mutateAsync(onCheck);
        } else {
            await checkTask.mutateAsync(onCheck);
        }
    }

    function update(id, name): void {
        setNewPost(false);
        setUpdatePost(true);
        setText(name);
        setUpdateId(id);
    }

    async function edit(event: BaseSyntheticEvent): Promise<void> {
        event.preventDefault();
        console.log(updateId);
        console.log(text);
        if(updateId) {
            const updateTask: IUpdateTask = {
                taskId: updateId,
                newText: text
            }
            await updateTasks.mutateAsync(updateTask);
            setUpdatePost(false);
        }
    }
    
    async function remove(id): Promise<void> {
        await removeTasks.mutateAsync(id);
    }


    return (
        <>
            <button onClick={add}>Add +</button>
            { newPost &&
                <> 
                    <form onSubmit={newTasks}>
                        <input 
                            type="text" 
                            placeholder="Nova Tarefa" 
                            onChange={assignment} 
                            value={text}
                        />
                        <input type="submit" value="+" />
                    </form>
                    <button onClick={() => cancel(newPost)}>Cancelar</button>
                </>
            }
            <section>
                <h2>Ativas</h2>
                <ul>
                    {data.map((task) => {
                        return (
                            <li key={task._id}>
                                <div>
                                    <input 
                                        type="checkbox" 
                                        value={task._id}
                                        checked={task.completed} 
                                        onChange={check} 
                                    />
                                    { updatePost && (updateId === task._id) ?
                                        <>
                                            <form onSubmit={edit}>
                                                <input type="text" onChange={assignment} value={text}/>
                                                <input type="submit" value="+" />
                                            </form>
                                            <button onClick={() => cancel(updatePost)}>Cancelar</button>
                                        </>
                                        :
                                        <>
                                            <h3 className={task.completed ? 'completed' : 'active'}>
                                                {task.task}
                                            </h3>
                                            <button onClick={() => update(task._id, task.task)}>Editar</button> 
                                        </>
                                    }
                                    <button onClick={() => remove(task._id)}>-</button>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </section>
        </>
    )
}