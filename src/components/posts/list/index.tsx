import { NextComponentType } from "next";
import { useState, useEffect, BaseSyntheticEvent } from "react";
import { api } from "../../../services/api";
import { useQuery, useMutation, useQueryClient } from 'react-query';

interface INewTask {
    text: String,
    userId: String
}

interface IUpdateTask {
    taskId: String,
    newText: String
}

export const List: NextComponentType = ({user}) => {

    const [newPost, setNewPost] = useState <Boolean> (false);
    const [updatePost, setUpdatePost] = useState <Boolean> (false);
    const [text, setText] = useState <String> ('');
    //const [tasks, setTasks] = useState([]);
    const [updateId, setUpdateId] = useState <null | String> (null);

    const queryClient = useQueryClient();

    const { isLoading, isSuccess, isError, data } = useQuery('tasks', async () => {
        try {
            const { data } = await api.get(`/posts/${user._id}`);
            return data;
        } catch(err) {
            return err;
        }
    });

    const createUser = useMutation(async ({text, userId}: INewTask) => {
        const res = await api.post('posts/new', {
            task: text,
            userId: userId
        });
        return res.data;
    }, /*{
        onSuccess: () => {
            queryClient.invalidateQueries('tasks');
        }
    }*/);

    const updateTasks = useMutation(async ({taskId, newText}: IUpdateTask) => {
        const res = await api.patch(`/posts/update/${taskId}`, {
            text: newText
        });
        return res.data;
    }, {
        onSuccess: () => {
            //queryClient.setQueryData(['tasks', ])
            queryClient.invalidateQueries('tasks');
        }
    });

    console.log(data);

    function assignment({target}: BaseSyntheticEvent): void {
        const { value } = target;
        setText(value);
    }

    function add(): void {
        setUpdatePost(false);
        setText('');
        setNewPost(true);
    }

    async function newTasks(event: BaseSyntheticEvent): Promise<void> {
        /** Nesta função será realizado um POST no banco de dados 
         * através do axios com api.post(conteudo) */
        event.preventDefault();
        const newTask: INewTask = {
            text: text,
            userId: user._id
        }
        await createUser.mutateAsync(newTask);
        setText('');
        setNewPost(false);
        /*
        event.preventDefault();
        api.post('/posts/new', {
            task: text,
            userId: user._id
        }).then((res) => {
            const response = res.data;
            setTasks([response, ...tasks]);
            setText('');
            setNewPost(false);
        })
        */
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
        }
    }
    
    async function remove(id): Promise<void> {
        console.log(id)
        await api.delete(`/posts/remove/${id}`)
    }

    function cancel(): void {
        setNewPost(false);
        setUpdatePost(false);
    }
    
    /*
    useEffect(() => {
        api.get(`/posts/${user._id}`).
            then((res) => {
                const response = res.data;
                console.log(response);
                setTasks(response);
            }).catch((err) => {
                console.log(err);
            })
    }, [])
    */

    return (
        <main>
            { isLoading && 
                <div>
                    <h1>Carregando</h1>
                </div>    
            }
            { isError && 
                <div>
                    <h1>Não foi possivel carregar as informações</h1>
                </div>
            }
            { isSuccess &&
                <>
                <button onClick={add}>Add +</button>
                { (newPost || updatePost) &&
                    <> 
                    <form onSubmit={(newPost && newTasks) || (updatePost && edit)}>
                        <input type="text" placeholder="Nova Tarefa" onChange={assignment} value={text}/>
                        <input type="submit" value="+" />
                    </form>
                    <button onClick={cancel}>Cancelar</button>
                    </>
                }
                <section>
                    <h2>Ativas</h2>
                    <ul>
                        {data.map((task) => {
                            return (
                                <li key={task._id}>
                                    <div>
                                        <input type="checkbox" name="task" id="task" />
                                        <h3>{task.task}</h3>
                                        <button onClick={() => update(task._id, task.task)}>Editar</button>
                                        <button onClick={() => remove(task._id)}>-</button>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </section>
                </>
            }
        </main>
    )
}