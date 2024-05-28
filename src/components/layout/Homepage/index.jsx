import { useCallback, useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import Cookies from 'js-cookie';
import MessageBlock from "../MessageBlock";
import Viewchat from "../Viewchat";
import Navbars from "../navbars";
import { openDB } from 'idb';
import Profile from "../profile";
import CrtCVS from "../createcvs";
import Contact from "../contacts";

import styles from './Homepage.module.css';

const HomePage = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [resSearch, setResSearch] = useState([])
    const [list_cvs, setList_cvs] = useState([])
    const [list_contact, setList_contact] = useState([])
    const [isShow, setIsShow] = useState(false);

    const handleUserSelection = (username) => {
        setSelectedUser(username);
    }

    const searchUser = (event) => {
        const searchTerm = event.target.value;
        if (searchTerm.trim() === '') {
            setResSearch([]);
            return;
        }
        fetch('http://localhost:3001/api/user/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'token': Cookies.get('token'), "email": searchTerm })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch messages');
                }
                return response.json();
            })
            .then(data => {
                setResSearch(data);
                console.log('Messages retrieved successfully', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    const fetchViewCVS = useCallback(() => {
        fetch("http://localhost:3001/api/conversation/viewconversation", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "token": Cookies.get("token") }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch messages');
                }
                return response.json();
            })
            .then(data => {
                setList_cvs(data);
                openDB('data', 1, {
                    upgrade(db) {
                        const store = db.createObjectStore('conversations', { keyPath: 'id' });
                        data.forEach(item => {
                            store.put({ id: item._id, fullname: item.users_fullname });
                        });
                    }
                });
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
            });
    }, [])

    const fetchViewContact = useCallback(() => {
        fetch("http://localhost:3001/api/contacts/viewpending", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "token": Cookies.get("token") }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch messages');
                }
                return response.json();
            })
            .then(data => {
                setList_contact(data);
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
            });
    }, []);

    useEffect(() => {
        fetchViewCVS();
        fetchViewContact();
    }, [fetchViewCVS, fetchViewContact]);


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const profileclick = () => {
        setIsShow(prev => !prev);
    }

    const closeProfile = () => {
        setIsShow(prev => !prev);
    }
    return (
        <div className={styles.masterLayout}>
            <div className={styles.sidebarLeft}>
                {isShow ? (
                    <Profile closeProfile={closeProfile} />
                ) : (
                    <>
                        <div className="search" >
                            <div onClick={toggleMenu}><FaBars size={20} /></div>
                            <input placeholder='Tìm kiếm' onChange={searchUser}></input>
                        </div>
                        {
                            isMenuOpen && (
                                <Navbars profileclick={profileclick} mouseLeave={toggleMenu} />
                            )
                        }
                        {resSearch.length > 0 && (
                            <div className="searchlist"  >
                                {resSearch.map((cvs, index) => (
                                    cvs.contact ? (
                                        <MessageBlock key={index} onUserSelect={handleUserSelection} user_id={cvs._id} user_fullname={cvs.users_fullname} />
                                    ) : (
                                        <CrtCVS key={index} user_id={cvs._id} user_fullname={cvs.users_fullname} />
                                    )
                                ))}
                            </div>
                        )}
                        <div className="chatlist">
                            {list_cvs.map((cvs, index) => (
                                <MessageBlock key={index} onUserSelect={handleUserSelection} user_id={cvs._id} user_fullname={cvs.users_fullname} subtitle={cvs.endmess} time={cvs.time} />
                            ))}
                            <p> Contact </p>
                            {list_contact.map((contact, index) => (
                                <Contact key={index} name={contact.users_fullname} id={contact._id} acceptButton={contact.accept} />
                            ))}
                        </div>
                    </>
                )}
            </div>
            <Viewchat fullname={selectedUser} />
        </div>
    );
}

export default HomePage;