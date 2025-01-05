import React, { useState, useEffect } from 'react';
import Calendar from './Calendar';
import TimeSpinner from './TimeSpinner';

function Home({ user }) {

    const [isAdding, setIsAdding] = useState(false);
    const [addDate, setAddDate] = useState(false);
    const [addTime, setAddTime] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState("23:59");
    const [userTask, setUserTask] = useState(null);


    const [formData, setFormData] = useState({
        account_id: user.id, 
        taskname: "", 
        description: "",
        deadline: selectedDate, 
        deadline_time: '23:59:59', 
        progress: false, 
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value, 
        });
    }
    
    const handleSubmit = async () => {
        setFormData({
            ...formData,
            userId: user.id, 
        });
        try {
            const response = await fetch('http://localhost:3001/todo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify(formData), 
            });
            if (response.ok) {
                const data = await response.json();
            } else {
                alert('failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Server error');
        }
    }

    const generateTimes = () => {
        const times = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 15) {
            const formattedHour = String(hour).padStart(2, "0");
            const formattedMinute = String(minute).padStart(2, "0");
            times.push(`${formattedHour}:${formattedMinute}`);
            }
        }
        return times;
    };
    
    const times = generateTimes();
    
    const handleAddTask = () => {
        setIsAdding(true);
    }

    const handleDate = () => {
        setAddDate(true);
    }

    const handleNotAddTask = () => {
        setIsAdding(false);
        setAddDate(false);
        setAddTime(false);
    }

    const handleApplyTask = async () => {
        setIsAdding(false);
        setAddDate(false);
        setAddTime(false);
        await handleSubmit();
        window.location.reload(); 
    }


    // Date button
    const handleCancelDate = () => {
        setAddDate(false);
        setAddTime(false);
    }

    const handleApplyDate = () => {
        setAddDate(false);
        setAddTime(false);
        setFormData({
            ...formData,
            deadline: selectedDate.toLocaleDateString(), 
        });
    }

    const handleTime = () => {
        setAddTime(true);
    }

    // Time button
    const handleCancelTime = () => {
        setAddTime(false);
        setFormData({
            ...formData,
            deadline_time: '23:59', 
        });
    }

    const handleApplyTime = () => {
        setAddTime(false);
        setFormData({
            ...formData,
            deadline_time: selectedTime, 
        });
    }

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const response = await fetch('http://localhost:3001/usertodo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }, 
                    body: JSON.stringify({id: user.id}), 
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserTask(data.usertodo)
                } else {
                    alert('failed');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Server error');
            }
        };
        fetchTodo();
    }, []);

    const handleCheck = async (taskId) => {
        try {
            const response = await fetch('http://localhost:3001/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: taskId }),
            });
            if (response.ok) {
                setUserTask(prevTasks => {
                    const updatedTasks = prevTasks.map(task =>
                        task.id === taskId ? { ...task, progress: true } : task
                    );
                    return updatedTasks;
                });
            } else {
                alert('failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Server error');
        }
    };

    return (
        <div className='home'>
            <div className='todo'>
                <h1>To do</h1>
                <div className='tasks'>
            {userTask && userTask.length > 0 ? (
                userTask.map((task) => (
                    task.progress === false && (
                        <div key={task.id}>
                            <div className='task'>
                                <button className='checkmark' onClick={() => handleCheck(task.id)}>
                                    {task.progress ? '✓' : ''}
                                </button>
                                <div>
                                    <h2>{task.taskname}</h2>
                                    <h3>{task.description}</h3>
                                </div>
                                <h3>{task.deadline}</h3>
                                <h3>{task.deadline_time}</h3>
                                <div>

                                </div>
                            </div>
                            <hr />
                        </div>
                    )
                ))
            ) : (
                <p>No tasks available</p>
            )}
                </div>
                <div className='create-task'>
                    <button className="add-task-button" onClick={handleAddTask}>+</button>
                {isAdding ? 
                    (<div>
                        <div className='add-form'>
                            <div className='task-input'>
                                <input 
                                    className='taskname' 
                                    placeholder="Task name"
                                    type="text"
                                    name="taskname"
                                    value={formData.taskname}
                                    onChange={handleChange}
                                />
                                <input 
                                    className='description' 
                                    placeholder="Description" 
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <button className='create-task-button' onClick={handleDate}>Date & Time</button>
                                <button className='create-task-button' onClick={handleNotAddTask}>Cancel</button>
                                <button className='create-task-button' onClick={handleApplyTask}>Add task</button>
                            </div>
                        </div>
                        {addDate && (
                            <div style={popupStyles.popup}>
                                <div className='date-container'>
                                    <div className='date-header'>
                                        <h2>Date</h2>
                                        <h2>{selectedDate.toLocaleDateString()}</h2>
                                    </div>
                                    <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} setFormData={setFormData} formData={formData}/>
                                    <div>
                                        <button className='create-task-button' onClick={handleTime}>Time</button>
                                        <button className='create-task-button' onClick={handleCancelDate}>Cancel</button>
                                        <button className='create-task-button' onClick={handleApplyDate}>Apply</button>
                                    </div>
                                </div>
                                <div className='time-header'>
                                    <h2>Time</h2>
                                    <h2>{selectedTime}</h2>
                                </div>   
                            {addTime && (
                                <div className='time-container'>                                 
                                    <TimeSpinner selectedTime={selectedTime} times={times} setSelectedTime={setSelectedTime} setFormData={setFormData}  formData={formData} />
                                    <button className='create-task-button' onClick={handleCancelTime} >Cancel</button>
                                    <button className='create-task-button' onClick={handleApplyTime}>Apply</button>
                                </div>
                            )}
                            </div>
                        )}
                    </div>
                    ) :
                    (<h2>New</h2>)
                }
                </div>
            </div>
        </div>
    );
}

const popupStyles = {
    popup: {
        backgroundColor: "#3E5879",
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
        width: '300px',
        textAlign: 'center',
        margin: '10px', 
    },
};

export default Home;