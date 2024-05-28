import Cookies from 'js-cookie';
import { useCallback } from 'react';

const Contact = ({ name, id, acceptButton }) => {
    console.log(acceptButton)
    const acceptContact = useCallback((user_id) => {
        fetch("http://localhost:3001/api/contacts/accept", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: Cookies.get('token'), id: user_id })
        })
            .then(response => response.json())
            .then(data => {
                console.log("trave", data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [])
    return (
        <div className={`messageblock`}  >
            <div className="massageblock-left">
                <div className="avt"></div>
            </div>
            <div className="massageblock-right">
                <div className="add-friend">
                    <div className="infor-name">{name}</div>
                    {!acceptButton && (
                        <button onClick={() => acceptContact(id)} className='btn'> Accept </button>
                    )}
                </div>
            </div>
        </div>
    )

}

export default Contact;