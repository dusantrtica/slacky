import React, { useState } from 'react';

const Message = ({message}) => {
   return ( <div className="message">
        <img src={message.avatar} /> {message.username}
        {new Date(message.time).toLocaleString()}
        {message.text}
    </div>)
}

const ChatArea = ({currentNumberOfUsers, onClickSend, messageToClients = []}) => {

    const [text, setText] = useState('');
    const [search, setSearch] = useState('');

    const handleTextChange = ({target: {value}}) => {
        setText(value);
    }
    const handleSend = () => {
        onClickSend(text);
        setText('');
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            handleSend();
        }
    }

    const handleSearchChange = ({target: {value}}) => {
        setSearch(value);
    }
    
    const messagesToDisplay = search ? messageToClients.filter(({text}) => text.toLowerCase().includes(search.toLowerCase())) : messageToClients;
    return (
        <div className="chatarea">
            <div className="flex">Users: {currentNumberOfUsers}
            &nbsp;
            Search: <input type="text" onChange={handleSearchChange}/>
            </div>
            Messages:
            {messagesToDisplay.map(msg => <Message key={msg.time} message={msg} />)}
            <div className="chatinput">
                <input type="text" onChange={handleTextChange} value={text} onKeyDown={handleKeyDown}/>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default ChatArea;