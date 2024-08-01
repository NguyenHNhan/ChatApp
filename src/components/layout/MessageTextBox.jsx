import { memo, useEffect, useState } from "react";
import { FaSmile, FaArrowUp } from "react-icons/fa";
import Cookies from 'js-cookie';
import io from 'socket.io-client';
import Responsive from "../utility/Responsive";
const socket = io('http://localhost:3001');
const MessageTextBox = () => {
    const [content, setContent] = useState('')

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleClickSentData();
        }
    };
    const handleClickSentData = () => {
        const requestData = {
            token: Cookies.get("token"),
            content: content,
            cvs_id: window.location.hash.substring(1)
        };

        socket.emit('joinRoom', window.location.hash.substring(1));

        socket.emit('sendMessage', requestData);

        fetch('http://localhost:3001/api/message/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to send message');
                }
                setContent('');
                console.log('Message sent successfully');
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });

    }
    return (
        <div className={Responsive().isResponsive ? `messagetextboxRes` : `messagetextbox` }>
            <FaSmile size={30} color="grey" />
            <input className="inputcontent" placeholder="Nhập văn bản" value={content} onChange={(e) => setContent(e.target.value)} onKeyPress={handleKeyPress}></input>
            <button className="btnsent" onClick={handleClickSentData}><FaArrowUp size={15} /></button>
        </div>
    );
}

export default memo(MessageTextBox);
