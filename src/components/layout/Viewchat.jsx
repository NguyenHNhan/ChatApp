import { useEffect, useState } from "react";
import BodyMessage from "./BodyMessage";
import HeaderMessage from "./HeaderMessage";
import MessageTextBox from "./MessageTextBox";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import Cookies from 'js-cookie';

import styles from "./Homepage/Homepage.module.css";
import Responsive from "../utility/Responsive";

const Viewchat = ({ fullname }) => {

    const location = useLocation();

    const [messageList, setMessageList] = useState([]);
    const cvs_id = window.location.hash.substring(1);

    useEffect(() => {

        if (!cvs_id) return;
        fetch('http://localhost:3001/api/message/viewmessages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "cvs_id": cvs_id, "token": Cookies.get('token') }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch messages');
                }
                return response.json();
            })
            .then(data => {
                setMessageList(data);
                console.log('Messages retrieved successfully');
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
            });
        const socket = io('http://localhost:3001');
        socket.emit('joinRoom', cvs_id);
        socket.on('message', (newMessage) => {
            console.log('Received message:', { newMessage });

            setMessageList(prevMessages => [...prevMessages, {
                token: newMessage.token,
                content: newMessage.content,
                cvs_id: newMessage.cvs_id
            }]);
        });
        return () => {
            socket.disconnect();
        };
    }, [cvs_id, location]);
    const responsiveData = Responsive();
    const { isResponsive, isSelect } = responsiveData;
    return (
        <div className={isResponsive ? (isSelect ? styles.sidebarRightRes : 'd-none') : styles.sidebarRight}>
            {cvs_id && (
                <>
                    <div className="header-message">
                        <HeaderMessage fullname={fullname} />
                    </div>
                    <div className="body-message">
                        <BodyMessage messages={messageList} />
                    </div>
                    <div className="footer-message">
                        <MessageTextBox />
                    </div>
                </>
            )}
        </div>
    );
}

export default Viewchat;