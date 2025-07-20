import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './styles/ProfileUser.css';

const ProfileUser = () => {


    const { id } = useParams();

    const [user,setUser] = useState({});

    useEffect(() => {
        const userId = id;
        const fetchUser = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user`,{ 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId }),
                });
                const data = await response.json();
                setUser(data.user);
                console.log(data.user);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    }, [id]);

    // Show loading state while user data is being fetched
    if (!user || Object.keys(user).length === 0) {
        return <div className="loading">Loading user data...</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>User Profile</h1>
            </div>
            
            <div className="user-info">
                <div>
                    <h2>{user.name || 'Guest User'}</h2>
                    <p>User ID: {id}</p>
                </div>
                <div className="user-stats">
                    <div className="points-badge">
                        {user.totalPoints || 0} Points
                    </div>
                </div>
            </div>
            
            <div className="points-history">
                <h3>Points History</h3>
                {user.pointsHistory && user.pointsHistory.length > 0 ? (
                    user.pointsHistory.map((point) => (
                        <div key={point._id} className="point-item">
                            <span className="point-value">+{point.point} points</span>
                            <span className="point-date">
                                {new Date(point.date).toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </span>
                        </div>
                    ))
                ) : (
                    <p className="no-history">No points history available</p>
                )}
            </div>
        </div>
    );
};

export default ProfileUser;