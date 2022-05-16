import React from 'react'
import { useEffect, useState } from 'react'

import Tasks from './Tasks';
import AddTask from './AddTask';

const TasksWrapper = ({ showButton }) => {
    const [tasks, setTasks] = useState([])
    const url = 'http://localhost:5000/tasks';


    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }

        getTasks();
    }, [])

    const fetchTasks = async () => {
        const res = await fetch(url)
        const data = await res.json()

        return data;
    }

    const fetchTask = async (id) => {
        const res = await fetch(`${url}/${id}`)
        const data = await res.json()

        return data;
    }

    const deleteTask = async (id) => {
        await fetch(`${url}/${id}`, { method: 'DELETE' })

        setTasks(tasks.filter(task => task.id !== id));
    }

    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id)
        const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

        const res = await fetch(`${url}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updTask)
        })

        const data = await res.json();

        setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
    }

    const addTask = async (task) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })

        const data = await res.json();
        setTasks([...tasks, data]);
    }

    return (
        <div>
            {showButton ? <AddTask onAdd={addTask} /> : ''}

            {tasks.length > 0 ?
                <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}></Tasks> : 'No Tasks To Show'
            }
        </div>
    )
}

export default TasksWrapper