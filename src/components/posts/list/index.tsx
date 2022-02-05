import { set } from "mongoose";
import { NextComponentType } from "next";
import { useState, useEffect } from "react";
import { api } from "../../../services/api";

export const List: NextComponentType = ({user}) => {

    const [newPost, setNewPost] = useState(false);
    const [text, setText] = useState('');
    const [tasks, setTasks] = useState([]);

    function assignment({target}) {
        const { value } = target;
        setText(value);
    }

    function add(event) {
        event.preventDefault();
        /** Nesta função será realizado um POST no banco de dados 
         * através do axios com api.post(conteudo) */
        
        api.post('/posts/new', {
            task: text,
            userId: user._id
        }).then((res) => {
            const response = res.data;
            setTasks([response, ...tasks]);
            setText('');
            setNewPost(false);
        })
        /*
        setTasks([text, ...tasks]);
        setText('');
        setNewPost(false);
        */
    }

    function update(id) {
        console.log(id);
    }
    
    function remove(id) {
        console.log(id)
        api.delete(`/posts/remove/${id}`).
            then((res) => {
                tasks.splice(id, 1);
                setTasks(tasks);
            }).catch((err) => {
                console.log(err);
            })
    }

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

    return (
        <main>
            <button onClick={() => setNewPost(true)}>Add +</button>
            { newPost && 
                <form onSubmit={add}>
                    <input type="text" placeholder="Nova Tarefa" onChange={assignment} value={text}/>
                    <input type="submit" value="+" />
                </form>
            }
            <section>
                <h2>Ativas</h2>
                <ul>
                    {tasks.map((task) => {
                        return (
                            <li key={task._id}>
                                <div>
                                    <input type="checkbox" name="task" id="task" />
                                    <h3>{task.task}</h3>
                                    <button onClick={() => update(task._id)}>Editar</button>
                                    <button onClick={() => remove(task._id)}>-</button>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </section>
        </main>
    )
}