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
        
        api.post('/api/posts/new', {
            task: text,
            userId: user._id
        }).then((res) => {
            console.log(res)
        })
        /*
        setTasks([text, ...tasks]);
        setText('');
        setNewPost(false);
        */
    }

    function remove(index) {
        tasks.splice(index, 1);
        return tasks
    }

    //console.log(user)

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
                {tasks.map((task, index) => {
                    return (
                        <ul key={task}>
                            <li>
                                <div>
                                    <input type="checkbox" name="task" id="task" />
                                    <h3>{task}</h3>
                                    <button onClick={() => remove(index)}>-</button>
                                </div>
                            </li>
                        </ul>
                    )
                })}
            </section>
        </main>
    )
}