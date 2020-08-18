import React, { useState } from 'react';

const Message = ({message}) => {
   return ( <div className="message">
        <img src={message.avatar} />
        {new Date(message.time).toLocaleString()}
        {message.text}
    </div>)
}

const ChatArea = ({onClickSend, messageToClients = []}) => {

    const [text, setText] = useState('');

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
    
    return (
        <div className="chatarea">
            Messages:
            {messageToClients.map(msg => <Message key={msg.time} message={msg} />)}
            <div className="chatinput">
                <input type="text" onChange={handleTextChange} value={text} onKeyDown={handleKeyDown}/>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default ChatArea;