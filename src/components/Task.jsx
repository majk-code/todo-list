import React, { useState, useEffect } from 'react';
import '../App.css';

const Task = () => {
    const [tasklist, setTasklist] = useState([]);
    const taskInputRef = React.createRef();
    const descInputRef = React.createRef();
    const dateInputRef = React.createRef();

    useEffect(() => {
        const savedTasklist = JSON.parse(localStorage.getItem('tasklist'));
        if (savedTasklist) {
            setTasklist(savedTasklist);
        }
    }, []);

    const handleCreateTask = () => {
        const inputValue = taskInputRef.current.value;
        const descInputValue = descInputRef.current.value;
        const dateInputValue = dateInputRef.current.value;
    
        if (!inputValue || !descInputValue || !dateInputValue) {
            return alert("Wprowadź brakujące dane");
        }
    
        const newTask = {
            title: inputValue,
            desc: descInputValue,
            date: dateInputValue,
            isDone: false,
            isRemoved: false
        };
    
        const updatedTasklist = [...tasklist, newTask];
        setTasklist(updatedTasklist);
    
        localStorage.setItem('tasklist', JSON.stringify(updatedTasklist));
    
        taskInputRef.current.value = '';
        descInputRef.current.value = '';
        dateInputRef.current.value = '';
    };
    
    const handleCheckTask = (index) => {
        const updatedTasklist = [...tasklist];
        updatedTasklist[index].isDone = true;
        setTasklist(updatedTasklist);
    
        localStorage.setItem('tasklist', JSON.stringify(updatedTasklist));
    };
    
    const handleRemoveTask = (index) => {
        const updatedTasklist = [...tasklist];
        updatedTasklist[index].isRemoved = true;
        setTasklist(updatedTasklist);
    
        localStorage.setItem('tasklist', JSON.stringify(updatedTasklist));
    };
    
    return (
        <main>
            <div className="task-wrapper">
                <div className="task-panel">
                    <div className="task-panel-text">
                        <h1>TASK MANAGER</h1>
                        <p>Dzięki tej aplikacji możesz swobodnie planować wiele zadań oraz elementów z twojego życia i w miare możliwości je uporządkować</p>
                    </div>
                    <div className="input-container">
                        <input ref={taskInputRef} className='task-input' type="text" placeholder='Dodaj nowe zadanie...' />
                        <input ref={descInputRef} className='task-desc' type="text" placeholder='Dodaj opis...' />
                        <input ref={dateInputRef} className='task-date' type="date" />
                        <button onClick={handleCreateTask} className="btn-add-task">Dodaj</button>
                    </div>
                </div>
                <div className="task-list">
                    {tasklist.map((task, index) => (
                        <div key={index} className={task.isRemoved ? 'task-container removed' : 'task-container'}>
                            <span className={task.isDone ? 'task-title done' : 'task-title'}>{task.title}</span>
                            <span className={task.isDone ? 'task-details done' : 'task-details'}>{task.desc}</span>
                            <span className="task-date">{`Do zrobienia na: ${task.date}`}</span>
                            <div className="task-manage">
                                <button onClick={() => handleCheckTask(index)} className="btn-check-task">Zrobione</button>
                                <button onClick={() => handleRemoveTask(index)} className="btn-remove-task">Usuń</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>  
        </main>  
    );
};

export default Task;
