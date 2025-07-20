import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Users.css';
const Users = () => {
    const navigate = useNavigate();
    const [users,setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/all-users');
                const data = await response.json();
                setUsers(data.users.sort((a,b)=>b.totalPoints-a.totalPoints) || []);       
                // setUsers(users.sort((a,b)=>b.totalPoints-a.totalPoints));
            } catch (error) {
                console.log(error);
            }
        };
        fetchUsers();        
    },[users]);

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
                    setUsers(data.users);
                })
                .catch((error) => console.error(error));
        }



    const claimPoints = (userId,Points) => {
        const random_number =Math.floor(Math.random() * 10) + 1;
        const data = { 
            userId,
            point:Points + random_number,
            date:new Date()
        }
        fetch('http://localhost:5000/api/claim-points', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.message);
                setUsers(data.users);
            })
            .catch((error) => console.error(error));

    }

    const pointsHistory = (userId) => {
        navigate(`/users/${userId}`);
    }

    return (
        <div className="users-container">
            <div className="users-header">
                <h1>Users Dashboard</h1>
                <p>Manage users and their points</p>
            </div>

            <div className="users-grid">
                {users && users.map((user) => (
                    <div key={user._id} className="user-card">
                        <h2>{user.name || 'Unnamed User'}</h2>
                        <div className="user-stats">
                            <div>
                                <div className="points-display">{user.totalPoints || 0}</div>
                                <div>Points</div>
                            </div>
                            <div className="button-group">
                                <button 
                                    className="btn btn-primary"
                                    onClick={() => claimPoints(user._id, user.totalPoints || 0)}
                                >
                                    Claim Points
                                </button>
                                <button 
                                    className="btn btn-secondary"
                                    onClick={() => pointsHistory(user._id)}
                                >
                                    View History
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="add-user-form">
                <h2>Add New User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="userName">User Name</label>
                        <input
                            id="userName"
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter user name"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                        Add User
                    </button>
                </form>
            </div>
        </div>
        );
};

export default Users;