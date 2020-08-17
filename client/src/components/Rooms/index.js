import React from 'react';
import './index.scss';


const Room = ({room}) => {
    return (
        <div className="room">{room.roomTitle}</div>
    )
}

const Rooms = ({rooms = []}) => {
    return (
        <div className="rooms">
            {rooms.map(room => <Room key={room.roomId} room={room} />)}
        </div>
    )
}

export default Rooms;