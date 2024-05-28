import { Link, useLocation } from "react-router-dom";

const MessageBlock = ({ onUserSelect, user_id, user_fullname, subtitle, time }) => {

    const handleClick = (username) => {
        onUserSelect(username);
    }
    const location = useLocation();

    return (
            <Link to={`/#${user_id}`} >
                <div className={`messageblock ${location.hash.substring(1) === user_id ? 'select' : ''}`} id={user_id} onClick={() => handleClick(user_fullname)} >
                    <div className="massageblock-left">
                        <div className="avt"></div>
                    </div>
                    <div className="massageblock-right">
                        <div className="infor">
                            <div>
                                <div className="infor-name">{user_fullname}</div>
                            </div>
                            <div className="infor-date">{time}</div>
                        </div>
                        <div className="subtitle">{subtitle}</div>
                    </div>
                </div>
            </Link >

    );
}

export default MessageBlock;