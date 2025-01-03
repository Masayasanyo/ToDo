import React, { useState } from 'react';
import Calendar from './Calendar';
import TimeSpinner from './TimeSpinner';

function Home({ user }) {

    const [isAdding, setIsAdding] = useState(false);
    const [addDate, setAddDate] = useState(false);
    const [addTime, setAddTime] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState("00:00");

    const [formData, setFormData] = useState({
        userId: user.id, 
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

    const handleNotAddTask = () => {
        setIsAdding(false);
        setAddDate(false);
        setAddTime(false);
    }

    const handleDate = () => {
        setAddDate(true);
    }

    const handleNotDate = () => {
        setAddDate(false);
        setAddTime(false);
    }

    const handleTime = () => {
        setAddTime(true);
    }

    const handleNotTime = () => {
        setAddTime(false);
    }

    return (
        <div className='home'>
            <div className='tasks'>
                <h1>To do</h1>
                <div className='task'>
                    <button className='checkmark'>✓</button>
                    <h2>task1</h2>
                </div>
                <div className='create-task'>
                    <div className='new-task'>
                        <button className="create-task-button" onClick={handleAddTask}>+</button>
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
                                    <button className='create-task-button'>Add task</button>
                                </div>
                            </div>
                            {addDate && (
                                <div style={popupStyles.popup}>
                                    <div className='date-container'>
                                        <h2>Date</h2>
                                        <h3>{selectedDate.toLocaleDateString()}</h3>
                                        <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} setFormData={setFormData} formData={formData}/>
                                        <div>
                                            <button className='create-task-button' onClick={handleTime}>Time</button>
                                            <button className='create-task-button' onClick={handleNotDate}>Close</button>
                                            <button className='create-task-button' onClick={handleNotDate}>Apply</button>
                                        </div>
                                    </div>
                                {addTime && (
                                    <div className='time-container'>
                                        <h2>Time</h2>
                                        <h3>{selectedTime}</h3>
                                        <TimeSpinner selectedTime={selectedTime} times={times} setSelectedTime={setSelectedTime} setFormData={setFormData}  formData={formData} />
                                        <button className='create-task-button' onClick={handleNotTime} >Close</button>
                                        <button className='create-task-button'>Apply</button>
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