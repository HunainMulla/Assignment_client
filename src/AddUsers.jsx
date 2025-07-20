import React, { useState } from 'react';
const AddUsers = () => {
    const [name, setName] = useState('');
    const handleSubmit = (e) => {
        if (!name) {
            alert('Please enter a name');
            return;
        }
        e.preventDefault();
        fetch('http://localhost:5000/api/add-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setName('');
            })
            .catch((error) => console.error(error));
    }
    return (
        <div>
            <h1>Add Users</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default AddUsers;