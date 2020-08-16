import React from 'react';
import './index.scss';

const rooms = ['#team-rnd', '#team-schedule', '#social-random'];

const Room = ({room}) => {
    return (
        <div className="room">{room}</div>
    )
}

const Rooms = () => {
    return (
        <div className="rooms">
            {rooms.map(room => <Room room={room} />)}
        </div>
    )
}

export default Rooms;