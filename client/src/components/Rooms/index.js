import React from 'react';
import './index.scss';


const Room = ({room, onClickRoom}) => {
    return (
        <div onClick={() => onClickRoom(room)} className="room">{room.roomTitle}</div>
    )
}

const Rooms = ({rooms = [], onClickRoom}) => {
    return (
        <div className="rooms">
            {rooms.map(room => <Room key={room.roomId} room={room} onClickRoom={onClickRoom} />)}
        </div>
    )
}

export default Rooms;