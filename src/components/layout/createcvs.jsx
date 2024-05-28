import Cookies from 'js-cookie';
import { Link } from "react-router-dom";

const CrtCVS = ({ user_fullname, user_id }) => {

    // const createconversation = (user_id) => {
    //     fetch("http://localhost:3001/api/conversation/createconversation", {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ token: Cookies.get('token'), id: user_id })
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log("trave", data);
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //         });
    // }

    const addContact = (user_id) => {
        fetch("http://localhost:3001/api/contacts/add", {
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


    }
    return (
        // <Link to={`/#${user_id}`} >
        <div className={`messageblock`}  >
            <div className="massageblock-left">
                <div className="avt"></div>
            </div>
            <div className="massageblock-right">
                <div className="add-friend">
                    <div className="infor-name">{user_fullname}</div>
                    <button className='btn' onClick={() => addContact(user_id)}> Add</button>
                </div>
            </div>
        </div>
        // </Link >

    )
}

export default CrtCVS;
